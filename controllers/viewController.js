
const data = require('../models/dataModel'); 

const renderRegisterPage = (req, res) => {
    res.render('register');
};

const renderLoginPage = (req, res) => {
    res.render('login');
};
const renderAdminPage = async (req, res) => {
    try {
        const loggedInUser = await data.findById(req.user.id);

        if (!loggedInUser) {
            return res.status(404).send('User not found');
        }

        const users = await data.find();  
        res.render('adminHome', { 
            user: loggedInUser, 
            loggedInUserId: loggedInUser.id, 
            users 
        });
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).send('Internal Server Error');
    }
};


const renderUserPage = async (req, res) => {
    try {
        const loggedInUserId = req.user.id;
        
        const loggedInUser = await data.findById(loggedInUserId);

        if (!loggedInUser) {
            return res.status(404).render('error', { message: 'Logged-in user not found' });
        }

        let users;
        if (loggedInUser.Role === 'Admin') {
            users = await data.find();
        } else {
            users = await data.find({ Role: { $ne: 'Admin' } });
        }

        res.render('userHome', { user: loggedInUser, loggedInUserId, users });
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).render('error', { message: 'Internal Server Error' });
    }
};

const renderAddUserAdminPage=(req,res) =>{
res.render('addUserAdmin')
}

const renderAddUserPage=(req,res)=>{
    res.render('addUser')

}

const renderUpdateUserPage = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await data.findById(userId);

        if (!user) {
            return res.status(404).render('error', { message: 'User not found' });
        }
        const loginedUserid = req.user.id;

        res.render('updateUser', { user,loginedUserid});
    } catch (error) {
        console.error('Error rendering update user page:', error.message);
        res.status(500).render('error', { message: 'Internal Server Error' });
    }
};

const renderUserProfile = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await data.findById(userId);

        if (!user) {
            return res.status(404).render('error', { message: 'User not found' });
        }
        res.render('userProfile', { user });
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
    renderAddUserAdminPage,
    renderUpdateUserPage,
    renderUserProfile
};
