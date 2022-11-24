//
window.onload=function(){
    addTableProducts(); 
}
//khung them san phẩm

//Tạo bảng sản Phẩm
function addTableProducts() {
var tc = document.getElementsByClassName('sanpham')[0].getElementsByClassName('table-content')[0];
var xuat = `<table>`;
for(var i=0;i < alcoholList.length;i++){
    var a=alcoholList[i];
            xuat+= `<tr>
                <td style="width: 5%">`+(i+1)+`</td>
                <td style="width: 5%">`+a.masp+`</td>
                <td style="width: 40%">`+a.tensp+`</td>
                <td style="width: 10%">`+a.thuonghieu+`</td>
                <td style="width: 10%">`+a.gia+`</td>
                <td style="width: 5%">`+a.sosao+`</td>
                <td style="width: 5%">`+a.nongdo+`</td>
                <td style="width: 10%">`+a.dungtich+`</td>
                <td style="width: 15%">
                    <div class="tooltip">
                        <i class="ti-pencil-alt" onclick="addKhungSuaSanPham('`+a.masp+`')"></i>
                    </div>
                    <div class="tooltip">
                        <i class="ti-trash"></i>
                    </div>
                </td>
            </tr>`;
            
    }
     xuat += `</table>`;
     tc.innerHTML = xuat;
}
//Mở khung sửa sản phẩm
function addKhungSuaSanPham(masp) {
    var sp;
    for(var a of alcoholList) {
        if(a.masp == masp) {
            sp = a;
        }
    }
    var xuat=`<span class="close" onclick="this.parentElement.style.transform = 'scale(0)';"><i class="ti-close"></i></span>
    <table class="overlayTable table-outline table-content table-header">
        <tr>
            <th colspan="2">Sửa Sản Phẩm: `+sp.tensp+`</th>
        </tr>
        <tr>
            <td>Mã sản phẩm:</td>
            <td><input type="text" value="`+sp.masp+`"></td>
        </tr>
        <tr>
            <td>Tên sản phẩm:</td>
            <td><input type="text" value="`+sp.tensp+`"></td>
        </tr>
        <tr>
            <td>Thương Hiệu:</td>
            <td>
                <select >`
        var danhsachthuonghieu=["Whisky","Rum","Vodka"];
        for( var c of danhsachthuonghieu){
            if(sp.thuonghieu==c)
                xuat+=(`<option value="`+c+`"selected>`+c+`</option>`);
                else xuat+=(`<option value="`+c+`">`+c+`</option>`);
        }
               xuat+=` </select>
            </td>
        </tr>
        
        <tr>
            <td>Hình:</td>
            <td>
                <img class="hinhDaiDien" id="anhDaiDienSanPhamThem" src="">
                <input type="file" accept="image/*" onchange="capNhatAnhSanPham(this.files, 'anhDaiDienSanPhamThem')">
            </td>
        </tr>
        <tr>
            <td>Giá tiền ($):</td>
            <td><input type="text" value="`+stringtoNum(sp.gia)+`"></td>
        </tr>
        <tr>
            <td>Số sao (số nguyên 0->5):</td>
            <td><input type="text" value="`+sp.sosao+`"></td>
        </tr>
        <tr>
            <td>Nồng độ:</td>
            <td><input type="text" value="`+sp.nongdo+`"></td>
        </tr>
        <tr>
            <td>Dung tích:</td>
            <td><input type="text" value="`+sp.dungtich+`"></td>
        </tr>
        <tr>
            <td colspan="2" class="table-footer"> <button onclick="themSanPham()">THÊM</button> </td>
        </tr>
    </table>`
    var khung = document.getElementById('khungSuaSanPham');
    khung.innerHTML = xuat;
    khung.style.transform = 'scale(1)';
}

function stringtoNum(str,char){
    return Number(str.split(char || '.').join(''));
}