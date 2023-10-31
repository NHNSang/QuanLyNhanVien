// Kiểm tra dữ liệu rông
function checkEmptyValue(value,idSpan){
    // Kiểm tra dữ liệu của người dùng
    if(value == ''){
        document.getElementById(idSpan).style.display = "block";
        document.getElementById(idSpan).innerHTML = 'Vui lòng ko bỏ trống';
        return false;
    }
    else{
        document.getElementById(idSpan).style.display = "block";
        document.getElementById(idSpan).innerHTML = "";
        return true;
    }
}
// Kiểm tra mật khẩu
function checkMinMaxVulua (value,idSpan,min,max){
    // kiểm tra độ dài kí tự
    if(value.length >=  min && value.length <= max){
        // Điều kiện đúng dữ liệu yêu cầu
        document.getElementById(idSpan).style.display = "block";

        document.getElementById(idSpan).innerHTML = '';
        return true
    }
    else{
        // Điều kiên dữ liệU sai
        document.getElementById(idSpan).style.display = "block";

        document.getElementById(idSpan).innerHTML = `Vui lòng nhập tối đa ${min} và ${max}`;
        return false
    }
}
// Kiểm tra email
function checkEmailValue(value,idSpan){
    var regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    // True, dữ liệu ko thoả mãn là false
    regexEmail.test(value);
    if(regexEmail.test(value)){
        document.getElementById(idSpan).style.display = "block";

        document.getElementById(idSpan).innerHTML = "";
        return true;
    }
    else{
        document.getElementById(idSpan).style.display = "block";

        document.getElementById(idSpan).innerHTML = "Định dạng email ko chính xác";
        return false;
    }
}
// Kiểm tra lương
function checkLuongMinMaxVulua(value, idSpan, min, max) {
    // Chuyển đổi giá trị nhập vào thành một số
    const luong = parseFloat(value.replace(/,/g, '')); // Loại bỏ dấu ',' nếu có

    // Kiểm tra giá trị lương nằm trong khoảng từ min đến max
    if (!isNaN(luong) && luong >= min && luong <= max) {
        // Điều kiện đúng dữ liệu yêu cầu
        document.getElementById(idSpan).style.display = "block";
        document.getElementById(idSpan).innerHTML = '';
        return true;
    } else {
        // Điều kiện dữ liệu sai
        document.getElementById(idSpan).style.display = "block";
        document.getElementById(idSpan).innerHTML = `Vui lòng nhập lương trong khoảng từ ${min}VNĐ đến ${max}VNĐs`;
        return false;
    }
}
// Kiểm tra giờ làm
function checkGioLam(value, idSpan, min, max) {
    const gioLam = parseInt(value);

    if (!isNaN(gioLam) && gioLam >= min && gioLam <= max) {
        document.getElementById(idSpan).innerHTML = "";
        return true;
    } else {
        document.getElementById(idSpan).innerHTML = `Vui lòng nhập giờ làm từ ${min} - ${max} giờ`;
        return false;
    }
}
