import user from "../models/user";
import userService from "../services/userService";
let handleGetAllContact = async (req, res) => {
  try {
    let info = await userService.handleGetAllContact();

    return res.status(200).json(info);
  } catch (error) {
    console.log(error);
    res.status(200).json({
      errCode: -1,
      errMessage: "error from server",
    });
  }
};
let handleLoging = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing inputs parameter!",
    });
  }

  let userData = await userService.handleUserLogin(email, password);
  //check email exist
  //password nhap vao ko dung
  //return userInfor
  // access_token :JWT json web token

  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};
let handleGetAllUsers = async (req, res) => {
  let id = req.query.id;
  //check id
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "missing input parameter",
      users: [],
    });
  }
  let users = await userService.getAllUsers(id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    users,
  });
};
let handleCreateNewUser = async (req, res) => {
  let message = await userService.createNewUser(req.body);
  console.log(message);
  return res.status(200).json(message);
};
let handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await userService.updateUser(data);
  return res.status(200).json(message);
};
let handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 2,
      errMessage: "Missing required parameter",
    });
  }
  let message = await userService.deleteUser(req.body.id);
  return res.status(200).json(message);
};

//
let getallCode = async (req, res) => {
  try {
    let response = await userService.getAllCodeService(req.query.type);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "error from server",
    });
  }
};
let handleGetCustomer = async (req, res) => {
  try {
    let data = await userService.handleGetCustomer(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "error from server",
    });
  }
};
let handleSaveUser = async (req, res) => {
  try {
    let response = await userService.handleSaveUser(req.body);
    return res.status(200).json({
      errCode: 0,
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMsg: "error from server",
    });
  }
};
let postVerifyBookAppointment = (req, res) => {
  try {
    let response = userService.postVerifyBookAppointmentService(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.log("Error", error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "error form server",
    });
  }
};
let handleSaveContract = async (req, res) => {
  try {
    let response = await userService.handleSaveContract(req.body);
    return res.status(200).json({
      errCode: 0,
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMsg: "error from server",
    });
  }
};

module.exports = {
  handleSaveContract,
  handleSaveUser,
  handleGetCustomer,
  handleLoging: handleLoging,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUser: handleCreateNewUser,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,
  getallCode: getallCode,
  postVerifyBookAppointment,
  handleGetAllContact,
};
