const { registerUserService,
    loginUserService,
    addUserAdminService,
    addUserService,
    updateUserService,
    deleteUserService,
    UserProfileService,
    userDataService,
    updatedDataService,
    getUpdatedData,
    updateExistingData } = require('../services/authService');

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

        console.log(user.Role)

        if (user.Role === 'Admin') {
            return res.redirect('/adminHome');
        } else if (user.Role === 'User')
            return res.redirect(`/userHome`);
        else {
            return res.redirect('/login');

        }

    } catch (error) {
        console.error('Login error:', error.message);
        return res.status(400).render('login', { message: error.message });
    }
};

const addUserAdmin = async (req, res) => {
    try {
        const { FirstName, MiddleName, LastName, Email, Password, confirmPassword, Role, Department } = req.body;

        const newUser = await addUserAdminService(
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

        res.redirect('/userHome');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { FirstName, MiddleName, LastName, Email, Role, Department } = req.body;

        if (!FirstName || !LastName || !Email || !Role) {
            return res.status(400).json({ message: 'Mandatory fields should be filled!' });
        }

        const updatedFields = { FirstName, MiddleName, LastName, Email, Role, Department };

        const oldData = await userDataService(userId)
        console.log(oldData, "old Data");


        const existingData = await getUpdatedData(userId)
        console.log(existingData.length, "existing");

        if (existingData.length) {
            const response = await updateExistingData(oldData, updatedFields, userId)
        } else {
            const response = await updatedDataService(oldData, updatedFields, userId)
        }

        const updatedUser = await updateUserService(userId, updatedFields);
        console.log("updatedUser:", updatedUser)

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.redirect('/adminHome');


    } catch (error) {
        console.error('Update user error:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        await deleteUserService(userId);

        res.redirect('/adminHome');
    } catch (error) {
        console.error('Delete user error:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const { FirstName, MiddleName, LastName, Email, Role, Department } = req.body;

        if (!FirstName || !LastName || !Email || !Role) {
            return res.status(400).json({ message: 'Mandatory fields should be filled!' });
        }

        const updatedFields = { FirstName, MiddleName, LastName, Email, Role, Department };

        const oldData = await userDataService(userId)
        console.log(oldData, "old Data");


        const existingData = await getUpdatedData(userId)
        console.log(existingData.length, "existing");

        if (existingData.length) {
            const response = await updateExistingData(oldData, updatedFields, userId)
        } else {
            const response = await updatedDataService(oldData, updatedFields, userId)
        }

        const updatedUser = await UserProfileService(userId, updatedFields);
        console.log("updatedUser:", updatedUser)

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.redirect('/UserHome');


    } catch (error) {
        console.error('Update user error:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


module.exports = {
    registerUser,
    loginUser,
    addUserAdmin,
    updateUser,
    deleteUser,
    updateProfile,
    addUser
};
