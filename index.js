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
console.log(arrIdSpan)
// Tạo mãng lưu nhân viên
var arrNhanVien = [];


// -----Tạo hàm lấy dữ liệU từ input------
function getValueUser(){
    // ko cho trang reload lại
    event.preventDefault()

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
        // else if(arrIdInput[i] == "luongCB"){
        //     isValid &= checkEmptyValue(valueIdInput,arrIdSpan[i]) && checkLuongMinMaxVulua(valueIdInput,arrIdSpan[i],1000000,20000000);
        // }
        else{
            isValid &= checkEmptyValue(valueIdInput,arrIdSpan[i])
        }
    }
    console.log(nhanVien)

    if(isValid){
        // Đẩy lên giao diện
        arrNhanVien.push(nhanVien);
        saveLocalStore("arrNhanVien",arrNhanVien);
        randerDispaly();

        // reset input
        document.getElementById("formRander").reset();
    }

}

// -----Tạo hàm rander dữ liệ------
function randerDispaly(arr){
    if(!arr){
        arr = arrNhanVien
    }
    // Rander lên giao diện
    var content = '';
    for(var z = 0; z<arr.length ; z++){
        var nhanVien = new NhanVien();
        var valueNhanVien = arr[z];
        Object.assign(nhanVien,valueNhanVien);
        content += `
        <tr>
        <td>${nhanVien.tknv}</td>
        <td>${nhanVien.name}</td>
        <td>${nhanVien.email}</td>
        <td>${nhanVien.datepicker}</td>
        <td>${nhanVien.chucvu}<td>              
        <td></td>              
        <td>
            <button onclick="deleteUser('${nhanVien.tknv}')" class="btn btn-danger">Xoá</button>
            <button class="btn btn-dark">Sửa</button>
        </td>
        </tr>
        `
    }
    document.getElementById("tableDanhSach").innerHTML = content;
}

document.getElementById("btnThemNV").onclick = getValueUser;

// -----Tạo hàm delete dữ liệ------
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

// -----Tạo localStorage------
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