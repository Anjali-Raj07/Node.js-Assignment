
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
        const loggedInUserId = req.user.id; 
        res.render('adminHome', { user: req.user, loggedInUserId, users });
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).send('Internal Server Error');
    }
};


const renderUserPage =(req,res)=>{
    res.render('userHome')
}

const renderAddUserPage=(req,res) =>{
res.render('addUser')
}

const renderUpdateUserPage = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await data.findById(userId);

        if (!user) {
            return res.status(404).render('error', { message: 'User not found' });
        }

        res.render('updateUser', { user, message: null });
    } catch (error) {
        console.error('Error rendering update user page:', error.message);
        res.status(500).render('error', { message: 'Internal Server Error' });
    }
};



module.exports = {
    renderRegisterPage,
    renderLoginPage,
    renderAdminPage,
    renderUserPage,
    renderAddUserPage,
    renderUpdateUserPage
};
