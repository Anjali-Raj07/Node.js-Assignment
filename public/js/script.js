const updateUser = async (userId, updates) => {
    const updatedUser = await data.findByIdAndUpdate(
        userId,
        { ...updates, updatedTime: new Date() },  
        { new: true }
    );
    return updatedUser;
};
