const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const { Company } = require("../models");
const Sequelize = require('sequelize');

const bcrypt = require("bcrypt");



router.post("/", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json("Missing required fields");
    }

    const user = await Users.findOne({ where: { email: email } });

    if (user) {
        return res.json("Email already exists");
    }


    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            name: name,
            email: email,
            password: hash,
        })
        res.json("Success");
    })
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json("Missing required fields");
    }

    const user = await Users.findOne({
         where: { email: email }
        });

    if (!user) res.json({ error: "User not found!" });

    if (user) {
        const companyDetails = await Company.findOne({ where: { id: user.dataValues.companyFK } });

        bcrypt.compare(password, user.password).then((match) => {
            if (!match) res.json({ error: "Wrong username and/or password!" });
            res.json({ status: true, data: user, companyDetails: companyDetails ? companyDetails.dataValues : null});
        });
    }
});



router.post("/fetchUsers", async (req, res) => {
    const userList = await Users.findAll({
        attributes: { exclude: ['password','createdAt', 'updatedAt'] }
    });

    return res.json({ status: true, userList: userList });
});

router.post("/addToCompany", async (req, res) => {

    const { email, companyId } = req.body;

    console.log('add to company');
    console.log(email);
    console.log(companyId);

    const userUpdateCompany = await Users.update({
        companyFK: companyId,
        status: 2
    },
        { where: { email: email } }
    );

    return res.json({ status: true, data: userUpdateCompany.dataValues });

});

router.post("/companyUsers", async (req, res) => {
    console.log('body');
    console.log(req.body);
    const { companyId } = req.body;
    console.log(companyId);
    const companyUsersList = await Users.findAll(
    { where: { companyFK: companyId } },
    // {
    //     attributes: ['name'] 
    // },
    );
    return res.json({ status: true, companyUsersList: companyUsersList });
});

router.post("/searchUsers", async (req, res) => {

    const { email } = req.body;
    const Op = Sequelize.Op;
    
    console.log(email);
    const userList = await Users.findAll({
    where: {
        email: {
          [Op.like]: `%${email}%`
        }
      }
    }
    );

    return res.json({ status: true, userList: userList });
});

module.exports = router;