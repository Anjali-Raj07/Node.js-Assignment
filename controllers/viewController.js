
const data = require('../models/dataModel'); 

const renderRegisterPage = (req, res) => {
    res.render('register');
};

const renderLoginPage = (req, res) => {
    res.render('login');
};
const renderAdminPage = async (req, res) => {
    try {
        const users = await data.find(); 

        res.render('adminHome', {
            user: req.user,  
            users           
        });
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).send('Internal Server Error');
    }
};

const renderUserPage =(req,res)=>{
    res.render('userHome')
}



module.exports = {
    renderRegisterPage,
    renderLoginPage,
    renderAdminPage,
    renderUserPage
};
