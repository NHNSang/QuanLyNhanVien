// Tạo lớp đối tượng nhân viên
function NhanVien(){
    this.tknv = '';
    this.name = '';
    this.email = '';
    this.password = '';
    this.datepicker = '';
    this.luongCB ='';
    this.chucvu = '';   
    this.gioLam = '';
    this.tinhTongLuong = function() {
        if(this.chucvu == "Sếp"){
            return this.luongCB * 3;
        }else if(this.chucvu == "Trưởng Phòng"){
            return this.luongCB * 2;
        }else{
            return this.luongCB * 1;
        }
    };
    this.xepLoaiNhanVien = function(){
        if(this.gioLam >= 192){
            return "Xuất sắc"
        }else if(this.gioLam >= 176){
            return "Giỏi"
        }else if(this.gioLam >= 160){
            return "Khá"
        }else{
            return "Trung Bình"
        }  
    }
}
