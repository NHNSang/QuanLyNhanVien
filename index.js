// --------Tạo mãng lưu trữ id input --------

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
console.log(arrIdInput)


// --------Tạo hàm lưu trữ dữ liệu --------
function getValueUser (){
    // Ngăn chặn reload
    event.preventDefault();


    // tạo biến đối tượng nhân viên
    var nhanVien = new NhanVien();

    // dom tới id để lấy dữ liệu
    for(var i = 0 ; i <arrIdInput.length; i++){
        var valueIdInput = document.getElementById(arrIdInput[i]).value;

        // Lưu trữ dữ liệu
        nhanVien[arrIdInput[i]] = valueIdInput;
    }

    console.log(nhanVien)
    arrNhanVien.push(nhanVien);
    // Đẩy dữ liệu và Local
    saveLocalStore("arrNhanVien",arrNhanVien);
    randerDisplay()

    // Clear các input
    document.querySelector(".modal-body form").reset();
}

// Tạo mãng lưu trữ
var arrNhanVien =[];
// --------Tạo hàm rander lên giao diện --------
function randerDisplay(arr){
    // để tối ưu hàm
    if(!arr){
        arr = arrNhanVien;
    }

    var content = '';
    for(var z = 0 ; z < arr.length ; z++){
        // tối ưu hàm phương thức thì sẽ dùng object để tính toán
        var nhanVien = new NhanVien();
        var valueNhanVien = arr[z];
        Object.assign(nhanVien,valueNhanVien)
        content += `
        <tr>
            <td>${nhanVien.tknv}</td>
            <td>${nhanVien.name}</td>
            <td>${nhanVien.email}</td>
            <td>${nhanVien.datepicker}</td>
            <td>${nhanVien.chucvu}<td>  <td><td>               
            <td><td>               
            <td>
            <button onclick="deleteUser('${nhanVien.tknv}')" class="btn btn-danger">Xoá</button>
            <button class="btn btn-dark">Sửa</button>
            </td
        </tr>
        `
    }   
    document.getElementById("tableDanhSach").innerHTML = content;
}

// --------Tạo hàm delete--------
function deleteUser(maNV){
    var index = -1;
    for(var i = 0 ;  i < arrNhanVien.length; i++){
        var nhanVien = arrNhanVien[i];
        if(nhanVien.tknv == maNV){
            index = i;
        }
    }
    if(index != -1){
        arrNhanVien.splice(index,1);
        // Đẩy dữ liệu và Local
        saveLocalStore("arrNhanVien",arrNhanVien);
        randerDisplay()
    }
}



document.querySelector(".modal-footer button.btn-success").onclick = getValueUser;

//---------tạo LocalStorage--------
// B1: Lưu trữ dữ liệu
function saveLocalStore(key,value){
    // tạo biến dể ép kiểu thành JSON
    var valueString = JSON.stringify(value);
    localStorage.setItem(key,valueString)
}
// B2: Lấy dữ liệu và rander lên giao diện
function getLocalStore(key){
    // tạo biến và chuyển đổi kiếu JSON thành Object,string
    var arrLocal = JSON.parse(localStorage.getItem(key))
    // Lưu ý khi chuyển đôi thì sẽ là null
    if(arrLocal){
        arrNhanVien = arrLocal;
        randerDisplay();
    }
}
getLocalStore("arrNhanVien")