// const updateUser = async (userId, updates) => {
//     const updatedUser = await data.findByIdAndUpdate(
//         userId,
//         { ...updates, updatedTime: new Date() },  
//         { new: true }
//     );
//     return updatedUser;
// };
const socket = io();
      socket.on("user details",(userdetails)=>{
           console.log(userdetails,"user");
           
      })
      const user = {
                id: "<%= user.id %>",
                firstName: "<%= user.FirstName %>",
                lastName: "<%= user.LastName %>",
                email: "<%= user.Email %>",
                role: "<%= user.Role %>"
            };
            if(user){
                socket.emit("login details",user)
            }
            socket.emit("getuser details")