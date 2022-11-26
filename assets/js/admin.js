//
window.onload=function(){
    //lấy dữ liệu từ localStorage hoặc từ alcoholList
    alcoholList=getalcoholList()||alcoholList;
    //them tab cho admin
    eventab();
    //tạo bảng
    addTableProducts(); 

}
function setalcoholList(newList) {
    window.localStorage.setItem('alcoholList', JSON.stringify(newList));
}

function getalcoholList() {
    return JSON.parse(window.localStorage.getItem('alcoholList'));
}


//SANPHAM++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Tạo bảng sản Phẩm
function addTableProducts() {
var tc = document.getElementsByClassName('sanpham')[0].getElementsByClassName('table-content')[0];
var xuat = `<table>`;
for(var i=0;i < alcoholList.length;i++){
    var a=alcoholList[i];
            xuat+= `<tr>
                <td style="width: 5%">`+(i+1)+`</td>
                <td style="width: 5%">`+a.masp+`</td>
                <td style="width: 40%">`+a.tensp
            if(a.hinh!=null)
                    xuat+=`<img src="`+a.hinh+`"></img>`
            xuat+=`        
                </td>
                <td style="width: 10%">`+a.thuonghieu+`</td>
                <td style="width: 10%">`+a.gia+`</td>
                <td style="width: 5%">`+a.sosao+`</td>
                <td style="width: 5%">`+a.nongdo+"%"+`</td>
                <td style="width: 10%">`+a.dungtich+"ML"+`</td>
                <td style="width: 15%">
                    <div class="tooltip">
                        <i class="ti-pencil-alt" onclick="addKhungSuaSanPham('`+a.masp+`')"></i>
                    </div>
                    <div class="tooltip" >
                        <i class="ti-trash" onclick="xoaSanPham('`+a.masp+`','`+a.tensp+`')"></i>
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
    <table class="overlayTable table-content table-header">
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
    xuat+=`
    </select>
            </td>
        </tr>
        
        <tr>
            <td>Hình:</td>
            <td>`
    if(sp.hinh!=null){
        xuat+= `<img class="hinhDaiDien" id="anhDaiDienSanPhamThem" src="`+sp.hinh+`">
        <a onclick="xoaAnhSanPham('`+sp.hinh+`')">Xóa hình</a>`
    }
    xuat+=`
                
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
            <td colspan="2" class="table-footer"><button onclick="suaSanPham('`+sp.masp+`')">LƯU THAY ĐỔI</button> </td>
        </tr>
    </table>`
    var khung = document.getElementById('khungSuaSanPham');
    khung.innerHTML = xuat;
    khung.style.transform = 'scale(1)';
}
let previewSrc;
//cập nhật ảnh sản phẩm
function capNhatAnhSanPham(files, id) {
    const reader = new FileReader();
    reader.addEventListener("load", function () {
        // convert image file to base64 string
        //chuyển đổi hình ảnh thành chuỗi
        previewSrc = reader.result;
        document.getElementById(id).src = previewSrc;
    }, false);

    if (files[0]) {
        reader.readAsDataURL(files[0]);
    }
} 

function layThongTinSanPhamTuTable(id) {
    //lấy dữ liệu trong thẻ html
    var khung = document.getElementById(id);
    var tr = khung.getElementsByTagName('tr');
    var masp1 = tr[1].getElementsByTagName('td')[1].getElementsByTagName('input')[0].value;
    var tensp1 = tr[2].getElementsByTagName('td')[1].getElementsByTagName('input')[0].value;
    var thuonghieu1 = tr[3].getElementsByTagName('td')[1].getElementsByTagName('select')[0].value;
    // var img1 = tr[4].getElementsByTagName('td')[1].getElementsByTagName('img')[0].src;
    var gia1 = tr[5].getElementsByTagName('td')[1].getElementsByTagName('input')[0].value;
    var sosao1 = tr[6].getElementsByTagName('td')[1].getElementsByTagName('input')[0].value;
    var nongdo1 = tr[7].getElementsByTagName('td')[1].getElementsByTagName('input')[0].value;
    var dungtich1 = tr[8].getElementsByTagName('td')[1].getElementsByTagName('input')[0].value;
    //xét điều kiện
    if(isNaN(gia1)) {
        alert('Giá phải là số nguyên');
        return false;
    }
    if(isNaN(sosao1)) {
        alert('Số sao phải là số nguyên');
        return false;
    }
    if(isNaN(nongdo1)) {
        alert('Nồng độ phải là số nguyên');
        return false;
    }
    if(isNaN(dungtich1)) {
        alert('Dung tích phải là số nguyên');
        return false;
    }
    //gán giá trị vào mảng
    try {
        return {
            "tensp": tensp1,
            "masp":masp1,
            "thuonghieu": thuonghieu1,
            "hinh": previewSrc,
            "gia": numToString(Number.parseInt(gia1, 10)),
            "sosao": Number.parseInt(sosao1, 10),
            "nongdo": Number.parseInt(nongdo1, 10),
            "dungtich": Number.parseInt(dungtich1, 10)
        }
    } catch(e) {
        alert('Lỗi: ' + e.toString());
        return false;
    }
}
//them san pham
function themSanPham(){
    var sanphammoi=layThongTinSanPhamTuTable('khungThemSanPham');

    if(!sanphammoi) return;
    for(var p of alcoholList) {
        if(p.masp == sanphammoi.masp) {
            alert('Mã sản phẩm bị trùng !!');
            return false;
        }

        if(p.tensp == sanphammoi.tensp) {
            alert('Tên sản phẩm bị trùng !!');
            return false;
        }
    }
     // Them san pham vao alcoholList
     alcoholList.push(sanphammoi);

     // Lưu vào localstorage
     setalcoholList(alcoholList);
 
     // Vẽ lại table
     addTableProducts();

    alert('Thêm sản phẩm "' + sanphammoi.tensp + '" thành công.');
    document.getElementById('khungThemSanPham').style.transform = 'scale(0)';
}

//hàm sửa sản phẩm
function suaSanPham(masp) {
    var sp = layThongTinSanPhamTuTable('khungSuaSanPham');

    //kiểm tra điều kiện
    if(!sp) return;
    for(var p of alcoholList) {
        if(p.masp == masp && p.masp != sp.masp) {
            alert('Mã sản phẩm bị trùng !!');
            return false;
        }
        if(p.tensp == sp.tensp && p.masp != sp.masp) {
            alert('Tên sản phẩm bị trùng !!');
            return false;
        }
    }

    // Sửa
    for(var i = 0; i < alcoholList.length; i++) {
        //tìm vị trí 
        if(alcoholList[i].masp == masp) {
            //gán thong tin mới sửa
            alcoholList[i] = sp;
        }
    }

    // Lưu vào localstorage
    setalcoholList(alcoholList);

    // Vẽ lại table
    addTableProducts();

    alert('Sửa ' + sp.tensp + ' thành công');
    document.getElementById('khungSuaSanPham').style.transform = 'scale(0)';
}

//hàm xóa sản phẩm
function xoaSanPham(masp, tensp) {
    if (window.confirm('Bạn có chắc muốn xóa ' + tensp)) {
        // Xóa
        for(var i = 0; i < alcoholList.length; i++) {
            if(alcoholList[i].masp == masp) {
                //xóa 1 phẩn tử tại vị trí i
                alcoholList.splice(i, 1);
            }
        }
        // Lưu vào localstorage
        setalcoholList(alcoholList);

        // Vẽ lại table 
        addTableProducts();
        document.getElementById('khungSuaSanPham').style.transform = 'scale(0)';
        document.getElementById('khungSuaSanPham').style.transform = 'scale(1)';

    }
}

//hàm xoa hinh san pham
function xoaAnhSanPham(hinh){
    for(var a of alcoholList)
    {
        if(a.hinh==hinh){
            a.hinh==null;
        }
    }
    setalcoholList(alcoholList);
    addTableProducts();
    alert('Đã xóa ảnh');
}
// 8888888888888888888888888888888888888 Đơn hàng
var TONGTIEN
function addTableDonHang() {
    var tc = document.getElementsByClassName('donhang')[0].getElementsByClassName('table-content')[0];
    var s = `<table>`;

    var listDH = getListDonHang();

    TONGTIEN = 0;
    for (var i = 0; i < listDH.length; i++) {
        var d = listDH[i];
        s += `<tr>
            <td style="width: 5%">` + (i+1) + `</td>
            <td style="width: 13%">` + d.ma + `</td>
            <td style="width: 7%">` + d.khach + `</td>
            <td style="width: 20%">` + d.sp + `</td>
            <td style="width: 15%">` + d.tongtien + `</td>
            <td style="width: 10%">` + d.ngaygio + `</td>
            <td style="width: 10%">` + d.tinhTrang + `</td>
            <td style="width: 10%">
                <div class="tooltip">
                    <i class="fa fa-check" onclick="duyet('`+d.ma+`', true)"></i>
                    <span class="tooltiptext">Duyệt</span>
                </div>
                <div class="tooltip">
                    <i class="fa fa-remove" onclick="duyet('`+d.ma+`', false)"></i>
                    <span class="tooltiptext">Hủy</span>
                </div>
                
            </td>
        </tr>`;
        TONGTIEN += stringToNum(d.tongtien);
    }

    s += `</table>`;
    tc.innerHTML = s;
}
function getListDonHang(traVeDanhSachSanPham = false) {
    var u = getListUser();
    var result = [];
    for(var i = 0; i < u.length; i++) {
        for(var j = 0; j < u[i].donhang.length; j++) {
            // Tổng tiền
            var tongtien = 0;
            for(var s of u[i].donhang[j].sp) {
                var timsp = timKiemTheoMa(list_products, s.ma);
                if(timsp.promo.name == 'giareonline') tongtien += stringToNum(timsp.promo.value);
                else tongtien += stringToNum(timsp.price);
            }

            // Ngày giờ
            var x = new Date(u[i].donhang[j].ngaymua).toLocaleString();

            // Các sản phẩm - dạng html
            var sps = '';
            for(var s of u[i].donhang[j].sp) {
                sps += `<p style="text-align: right">`+(timKiemTheoMa(list_products, s.ma).name + ' [' + s.soluong + ']') + `</p>`;
            }

            // Các sản phẩm - dạng mảng
            var danhSachSanPham = [];
            for(var s of u[i].donhang[j].sp) {
                danhSachSanPham.push({
                    sanPham: timKiemTheoMa(list_products, s.ma),
                    soLuong: s.soluong,
                });
            }

            // Lưu vào result
            result.push({
                "ma": u[i].donhang[j].ngaymua.toString(),
                "khach": u[i].username,
                "sp": traVeDanhSachSanPham ? danhSachSanPham : sps,
                "tongtien": numToString(tongtien),
                "ngaygio": x,
                "tinhTrang": u[i].donhang[j].tinhTrang
            });
        }
    }
    return result;
}

// Duyệt
function duyet(maDonHang, duyetDon) {
    var u = getListUser();
    for(var i = 0; i < u.length; i++) {
        for(var j = 0; j < u[i].donhang.length; j++) {
            if(u[i].donhang[j].ngaymua == maDonHang) {
                if(duyetDon) {
                    if(u[i].donhang[j].tinhTrang == 'Đang chờ xử lý') {
                        u[i].donhang[j].tinhTrang = 'Đã giao hàng';
                    
                    } else if(u[i].donhang[j].tinhTrang == 'Đã hủy') {
                        alert('Không thể duyệt đơn đã hủy !');
                        return;
                    }
                } else {
                    if(u[i].donhang[j].tinhTrang == 'Đang chờ xử lý') {
                        if(window.confirm('Bạn có chắc muốn hủy đơn hàng này. Hành động này sẽ không thể khôi phục lại !'))
                            u[i].donhang[j].tinhTrang = 'Đã hủy';
                    
                    } else if(u[i].donhang[j].tinhTrang == 'Đã giao hàng') {
                        alert('Không thể hủy đơn hàng đã giao !');
                        return;
                    }
                }
                break;
            }
        }
    }

    // lưu lại
    setListUser(u);

    // vẽ lại
    addTableDonHang();
}





























//hàm chuyển kiểu dữ liệu
function stringtoNum(str,char){
    return Number(str.split(char || '.').join(''));
}
function numToString(num, char) {
    return num.toLocaleString().split(',').join(char || '.');
}

//mở các mục chính
function eventab(){
    const opensanpham=document.querySelector('.js-opensanpham')
    const khungsanpham=document.querySelector('.js-sanpham')

    const opendonhang=document.querySelector('.js-opendonhang')
    const khungdonhang=document.querySelector('.js-donhang')

    const openkhachhang=document.querySelector('.js-openkhachhang')
    const khungkhachhang=document.querySelector('.js-khachhang')

    const opentrangchu=document.querySelector('.js-opentrangchu')
    const khungtrangchu=document.querySelector('.js-trangchu')
    
    function showsanpham(){
        khungsanpham.classList.add('open')
        khungdonhang.classList.remove('open')
        khungkhachhang.classList.remove('open')
        khungtrangchu.classList.remove('open')
        opensanpham.classList.add('action')
        opentrangchu.classList.remove('action')
        openkhachhang.classList.remove('action')
        opendonhang.classList.remove('action')
    }
    opensanpham.addEventListener('click',showsanpham)

    function showdonhang(){
        khungdonhang.classList.add('open')
        khungkhachhang.classList.remove('open')
        khungsanpham.classList.remove('open')
        khungtrangchu.classList.remove('open')
        opendonhang.classList.add('action')
        opentrangchu.classList.remove('action')
        openkhachhang.classList.remove('action')
        opensanpham.classList.remove('action')
    }
    opendonhang.addEventListener('click',showdonhang)

    function showkhachhang(){
        khungkhachhang.classList.add('open')
        khungdonhang.classList.remove('open')
        khungsanpham.classList.remove('open')
        khungtrangchu.classList.remove('open')
        openkhachhang.classList.add('action')
        opentrangchu.classList.remove('action')
        opendonhang.classList.remove('action')
        opensanpham.classList.remove('action')
    }
    openkhachhang.addEventListener('click',showkhachhang)
        
    
    function showtrangchu(){
        khungtrangchu.classList.add('open')
        khungdonhang.classList.remove('open')
        khungsanpham.classList.remove('open')
        khungkhachhang.classList.remove('open')
        opentrangchu.classList.add('action')
        openkhachhang.classList.remove('action')
        opendonhang.classList.remove('action')
        opensanpham.classList.remove('action')
    }
    opentrangchu.addEventListener('click',showtrangchu)
}