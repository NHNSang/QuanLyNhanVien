// Tạo mãng id input
var arrIdInput = [
    'tknv',
    'name',
    'email',
    'password',
    'datepicker',
    'luongCB',
    'chucvu',
    'gioLam',
];

// Tạo mãng id span
var arrIdSpan = [
    'tbTKNV',
    'tbTen',
    'tbEmail',
    'tbMatKhau',
    'tbNgay',
    'tbLuongCB',
    'tbChucVu',
    'tbGiolam',
];

// Tạo mãng lưu nhân viên
var arrNhanVien = [];

// Tạo mãng lưu trữ từng nhân viên

// -----Tạo hàm lấy dữ liệU từ input------
function getValueUser(){

    // Tạo biến nhanVien
    var nhanVien = new NhanVien();
    
    
    // Tạo biến để kiểm tra validation
    var isValid  = true;

    // Đưa dữ liệu lên
    for(var i = 0 ; i < arrIdInput.length ; i++){
        var valueIdInput= document.getElementById(arrIdInput[i]).value;
        

        // Lưu trữ dữ liệU
        nhanVien[arrIdInput[i]] = valueIdInput;
        


        // Thông báo validation
        if(arrIdInput[i] == "email"){
            isValid &= checkEmptyValue(valueIdInput,arrIdSpan[i]) && checkEmailValue(valueIdInput,arrIdSpan[i]);
        }
        else if(arrIdInput[i] == "password"){
            isValid &= checkEmptyValue(valueIdInput,arrIdSpan[i]) && checkMinMaxVulua(valueIdInput,arrIdSpan[i],6,10);
        }
        else if(arrIdInput[i] == "luongCB"){
            isValid &= checkEmptyValue(valueIdInput,arrIdSpan[i]) && checkLuongMinMaxVulua(valueIdInput,arrIdSpan[i],1000000,20000000);
        }
        else if(arrIdInput[i] == "gioLam"){
            isValid &= checkEmptyValue(valueIdInput,arrIdSpan[i]) && checkGioLam(valueIdInput,arrIdSpan[i],80,200);
        }
        else{
            isValid &= checkEmptyValue(valueIdInput,arrIdSpan[i])
        }
    }
    console.log(nhanVien)
    

    if(isValid){
        return nhanVien;
    }

}

// -----Tạo hàm addUser-----
function addUser(){
    var nhanVien = getValueUser();
    
    // ko cho trang reload lại
    event.preventDefault()
    if(nhanVien){
    // Đẩy lên giao diện
    arrNhanVien.push(nhanVien);
    saveLocalStore("arrNhanVien",arrNhanVien);
    randerDispaly();

    // reset input
    document.getElementById("formRander").reset();
    }
}

// -----Tạo hàm rander dữ liệu------
function randerDispaly(arr){
    if(!arr){
        arr = arrNhanVien
    }
    // Rander lên giao diện
    var content = '';
    for(var z = 0; z<arr.length ; z++){
        var nhanVien = new NhanVien();
        var valueNhanVien = arr[z];
        // Dùng object để ra kết qua phương thức
        Object.assign(nhanVien,valueNhanVien);
        content += `
        <tr>
            <td>${nhanVien.tknv}</td>
            <td>${nhanVien.name}</td>
            <td>${nhanVien.email}</td>
            <td>${nhanVien.datepicker}</td>
            <td>${nhanVien.chucvu}</td>              
            <td>${nhanVien.tinhTongLuong().toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
            <td>${nhanVien.xepLoaiNhanVien()}</td>
            <td>
                <button onclick="deleteUser('${nhanVien.tknv}')" class="btn btn-danger">Xoá</button>
                <button onclick="getInfoUser('${nhanVien.tknv}')" class="btn btn-dark">Sửa</button>
            </td>
        </tr>
        `
    }
    document.getElementById("tableDanhSach").innerHTML = content;
}

document.getElementById("btnThemNV").onclick = addUser;

// -----Tạo hàm delete dữ liệu------
function deleteUser(maNv){
    var index = -1
    for(var i = 0; i < arrNhanVien.length ; i++){
        var nhanVien = arrNhanVien[i];
        if(nhanVien.tknv == maNv){
            index = i
        }
    }
    if(index != -1){
        arrNhanVien.splice(index,1);
        saveLocalStore("arrNhanVien",arrNhanVien);
        randerDispaly()
    }
}
// -----Tạo hàm edit dữ liệu------
// Lấy dữ liệu
function getInfoUser(maNv){
    var nhanVien = {};
    // Lấy dữ liệu
    for(var i = 0; i < arrNhanVien.length ; i++){
        if(arrNhanVien[i].tknv == maNv){
            nhanVien = arrNhanVien[i];
        }
    }
    for(var z = 0; z < arrIdInput.length; z++){
        document.getElementById(arrIdInput[z]).value = nhanVien[arrIdInput[z]];
        if(arrIdInput == 'tknv'){
            document.getElementById(arrIdInput[z]).readOnly = true; 
        }
    }
}
// edit dữ liệu
function editValueUser(){
    var nhanVien = getValueUser();
    var index = -1;
    for(var i = 0; i < arrNhanVien.length; i++){
        if(nhanVien.tknv == arrNhanVien[i].tknv){
            index = i
        }
    }
    document.getElementById('tknv').readOnly = false;
    document.getElementById('formRander').reset();
    arrNhanVien[index] = nhanVien;
    saveLocalStore("arrNhanVien",arrNhanVien);
    randerDispaly();
}
document.getElementById("btnCapNhat").onclick = editValueUser;

// -----Tạo tìm kiếm------
function searchDataUser(event){
    var keyword = event.target.value;
    var newKeyWord = removeVietnameseTones(keyword.toLowerCase().trim());
    console.log(newKeyWord);

    var arrSearchNhanVien = [];
    for(var i = 0 ; i < arrNhanVien.length ; i++){
        var tenNhanVien = removeVietnameseTones(arrNhanVien[i].name.toLowerCase().trim());
        if(tenNhanVien.includes(newKeyWord)){
            arrSearchNhanVien.push(arrNhanVien[i]);
        }
    }
    console.log(arrSearchNhanVien)
    randerDispaly(arrSearchNhanVien)
}













// -----Tạo localStorage và lưu trữ------
// Tạo hàm đưa lưu dữ liệu
function saveLocalStore(key,value){
    // Chuyển dữ liệu về JSON
    var arrString = JSON.stringify(value);
    localStorage.setItem(key,arrString)
}
// Đưa dữ liệu lên giao diện
function getLocalStore(key){
    var arrLocal = JSON.parse(localStorage.getItem(key));
    if(arrLocal){
        arrNhanVien = arrLocal
        randerDispaly()
    }
}
getLocalStore('arrNhanVien')