const {registerUserService,loginUserService,addUserService} = require('../services/authService'); 

const registerUser = async (req, res) => {
    try {
        const { FirstName, MiddleName, LastName, Email, Password, confirmPassword, Role, Department } = req.body;

        const newUser = await registerUserService(
            FirstName,
            MiddleName,
            LastName,
            Email,
            Password,
            confirmPassword,
            Role,
            Department
        );

        res.redirect('/login');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {

    try {
        const { Email, Password } = req.body;

        const { accessToken, user } = await loginUserService(Email, Password);

        res.cookie('token', accessToken, { httpOnly: true });

        if (user.Role === 'Admin') {
            return res.redirect('/adminHome');
        } else {
            return res.redirect('/userHome');
        }
    } catch (error) {
        console.error('Login error:', error.message);
        return res.status(400).render('login', { message: error.message });
    }
};

const addUser = async (req, res) => {
    try {
        const { FirstName, MiddleName, LastName, Email, Password, confirmPassword, Role, Department } = req.body;

        const newUser = await addUserService(
            FirstName,
            MiddleName,
            LastName,
            Email,
            Password,
            confirmPassword,
            Role,
            Department
        );

        res.redirect('/adminHome');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


module.exports = { registerUser, loginUser,addUser };
