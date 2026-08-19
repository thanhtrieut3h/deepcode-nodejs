// kiem tra du lieu cua AuthController

// kiem tra email co hop le hay khong ?
export const validateEmail = (email) => {
    // su dung bieu thuc chinh quy : regualar expression
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}
// kiem tra do manh yeu cua mat khau
export const validatePassword = (password) => {
    const passwordRegex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{}<>?]).{8,}$/;
    return passwordRegex.test(password);
}
// kiem tra du lieu dang ky tai khoan
export const validateRegister = (data) => {
    const errors = [];
    if(!data.username){
        errors.push("username is required");
    } else if(data.username.length < 3){
        errors.push("username must be at least 3 charater.")
    }
    if(!data.password){
        errors.push("password is required");
    } else if(!validatePassword(data.password)){
        errors.push("password is not strong");
    }
    if(!data.email){
        errors.push("email is required");
    } else if(!validateEmail(data.email)){
        errors("Invalid email format");
    }
    if(!data.fullName){
        errors.push("Fullname is required");
    } else if(data.fullName.length < 3){
        errors.push("Fullname must be at least 3 charater.")
    }
    
    return {
        isValid : errors.length === 0,
        errors
    }
}