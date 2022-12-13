//
window.onload=function(){
    if (window.localStorage.getItem('admin')) {
    //lấy dữ liệu từ localStorage hoặc từ alcoholList
    alcoholList=getalcoholList()||alcoholList;
    //them tab cho admin
    eventab();
    //tạo bảngf
    addTableProducts(); 
    addTableDonHang();
    addTableKhachHang();
    addTableThongKe();
        
    } else {
        document.body.innerHTML = `<h1  style="background-color:pink; color:red; with:100%; text-align:center; margin: 50px;"> Bạn Chưa Đăng Nhập ADMIN </h1>`;
    }

}
function setalcoholList(newList) {
    window.localStorage.setItem('alcoholList', JSON.stringify(newList));
}

function getalcoholList() {
    return JSON.parse(window.localStorage.getItem('alcoholList'));
}
//hàm chuyển kiểu dữ liệu
function stringToNum(str,char){
    return Number(str.split(char || '.').join(''));
}
function numToString(num, char) {
    return num.toLocaleString().split(',').join(char || '.');
}
function logOutAdmin() {
    window.localStorage.removeItem('admin');
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
// Hàm get set cho danh sách người dùng
function setListUser(l) {
    window.localStorage.setItem('ListUser', JSON.stringify(l));
}
function getListUser() {
    var data = JSON.parse(window.localStorage.getItem('ListUser')) || []
    var l = [];
    for (var d of data) {
        l.push(d);
    }
    return l;
}
////////////////////////////////////////////////////////////////////////thống kê
function addTableThongKe(){

    function timsanpham(danhsachsanphamdaban){
        var max=0;
        for(s of danhsachsanphamdaban){
            if(s.soluong>max)
            max=s.soluong
        }
        for(s of danhsachsanphamdaban){
            if(max==s.soluong)
            return s.masp;
        }
    }
    var user=getListUser();
    var soluongkhachhang=user.length;
    var tongsoluongdonhang=0;
    var tongsoluongsanpham=0;
    var tonggiatri=0;
    var giatritrungbinhdon;
    var danhsachsanphamdaban=[];
    for (var i = 0; i < user.length; i++) {
        for(var j=0;j<user[i].donhang.length;j++)
        {
            for(u=0;u<user[i].donhang[j].sp.length;u++){
                tongsoluongsanpham+=user[i].donhang[j].sp[u].soluong; 
                var masp = user[i].donhang[j].sp[u].ma;
      			var p = timKiemTheoMa(alcoholList, masp);
        		var soluongSp = user[i].donhang[j].sp[u].soluong;
                tonggiatri+=(stringToNum(p.gia)*soluongSp)
                var daCoSanPham = false;
                for (var x = 0; x < danhsachsanphamdaban.length; x++) { // check trùng sản phẩm
                    if (danhsachsanphamdaban[x].masp == masp) {
                        danhsachsanphamdaban[x].soluong+=soluongSp;
                        daCoSanPham = true;
                        break;
                    }
                }
                if (!daCoSanPham) { // nếu không trùng thì mới thêm sản phẩm vào danhsachsanphamdaban
                    danhsachsanphamdaban.push({
                        "masp": p.masp,
                        "thuonghieu":p.thuonghieu,
                        "soluong": soluongSp,
                        "gia":p.gia
                    });
                }
            }
        }
            tongsoluongdonhang+=user[i].donhang.length;           
    }
    giatritrungbinhdon=numToString(tonggiatri/tongsoluongdonhang-(tonggiatri/tongsoluongdonhang)%1)
    var sanphambanchay=timsanpham(danhsachsanphamdaban)
    var thongkehang=[];
    console.log(danhsachsanphamdaban)
    for(s of danhsachsanphamdaban)
    {
        var dacohang=false;
        for (var x = 0; x < thongkehang.length; x++) { // check trùng sản phẩm
            if (thongkehang[x].tenhang == s.thuonghieu) {
                thongkehang[x].soluong+=s.soluong;
                thongkehang[x].doanhthu+stringToNum(s.gia)*s.soluong;
                dacohang = true;
                break;
            }
        }
        if (!dacohang) { // nếu không trùng thì mới thêm sản phẩm vào thongkehang
            thongkehang.push({
                "tenhang":s.thuonghieu,
                "soluong": s.soluong,
                "doanhthu": stringToNum(s.gia)*s.soluong
            });
        }
    }

    var xuat=`<div class="statistical">
    <div class="item-statistical">
        Tổng số đơn hàng đã bán: <div class="num">`+tongsoluongdonhang+`</div>
    </div>
    <div class="item-statistical">
        Tổng số lượng khách hàng: <div class="num">`+soluongkhachhang+`</div>
    </div>
    <div class="item-statistical">
        Tổng số rượu đã bán là: <div class="num">`+tongsoluongsanpham+`</div>
    </div>
    <div class="item-statistical">
        Tổng doanh số là: <div class="num">`+numToString(tonggiatri)+` VND</div>
    </div>
    <div class="item-statistical">
        Sản phẩm bán chạy nhất là : <div style="font-size:20px"class="num">`+timKiemTheoMa(alcoholList,sanphambanchay).tensp+` - `+timKiemTheoMa(danhsachsanphamdaban,sanphambanchay).soluong+` sản phẩm</div>
    </div>
    <div class="item-statistical">
        Giá trị trung bình đơn: <div class="num">`+giatritrungbinhdon+` VND</div>
    </div>
    </div>`
    bieudosoluong(thongkehang);
    bieudohang(thongkehang);
    function bieudohang(thongkehang){
        var xValues = [];
        var yValues = [];
        for(var s=0;s<thongkehang.length;s++){
            xValues[s]=thongkehang[s].tenhang;
            yValues[s]=thongkehang[s].doanhthu;
        }
        var barColors = [
            "#b91d47",
            "#00aba9",
            "#e8c3b9"
        ];
        new Chart("myChart", {
            type: "doughnut",
            data: {
                labels: xValues,
                datasets: [{
                    backgroundColor: barColors,
                    data: yValues
                }]
            },
            options: {
                title: {
                    display: true   ,
                    text: "THÔNG KÊ THEO DOANH SỐ BÁN HÀNG 2022",
                    font: 20
                },
            }
        });
    }
    function bieudosoluong(thongkehang){
        var xValues = [];
        var yValues = [];
        for(var s=0;s<thongkehang.length;s++){
            xValues[s]=thongkehang[s].tenhang;
            yValues[s]=thongkehang[s].soluong;
        }
        var barColors = [
            "#b91d47",
            "#00aba9",
            "#e8c3b9"
        ];
        new Chart("myChart1", {
            type: "doughnut",
            data: {
                labels: xValues,
                datasets: [{
                    backgroundColor: barColors,
                    data: yValues
                }]
            },
            options: {
                title: {
                    display: true   ,
                    text: "THỐNG KÊ THEO SỐ LƯỢNG BÁN HÀNG 2022",
                    font: 20
                },
            }
        });
    }

var trangchu=document.getElementsByClassName('trangchu1')[0];
trangchu.innerHTML=xuat;
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
        <a onclick="xoaAnhSanPham('`+sp.masp+`')">Xóa hình</a>`
    }

    xuat+=`
                <input type="file" accept="image/*" onchange="capNhatAnhSanPham(this.files, 'anhDaiDienSanPhamThem')">
            </td>
        </tr>
        <tr>
            <td>Giá tiền (₫):</td>
            <td><input type="text" value="`+stringToNum(sp.gia)+`"></td>
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
//biến lưu ảnh sản phẩm
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
//lấy thông tin trong bảng thêm sửa
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
    }
}

//hàm xoa hinh san pham
function xoaAnhSanPham(masp){        
    for(var a of alcoholList)
    {
        if(a.masp==masp){
            a.hinh=null;
        }
    }
    // alert('ĐÃ XÓA ẢNH')
    //lưu lại dữ liệu
    setalcoholList(alcoholList);
    // Vẽ lại table
    addTableProducts();
    addKhungSuaSanPham(masp);
    previewSrc=null;
    // document.getElementById('khungSuaSanPham').style.transform = 'scale(0)';
}   
// ===================================================Đơn hàng
var TONGTIEN;
function reverseString (s) {
    var i = s.length,o = '';
    while (i > 0) {
        o += s.substring(i - 1, i);
        i--;
    }
    return o;
}
function addTableDonHang() {
    var tc = document.getElementsByClassName('donhang')[0].getElementsByClassName('table-content')[0];
    var s = `<table>`;

    var listDH = getListDonHang();
    var fromdate=document.getElementById('loctheongay').getElementsByClassName("locdon")[0].value;
    var todate=document.getElementById('loctheongay').getElementsByClassName("locdon")[1].value;

    var from=new Date(fromdate).toLocaleString();
    var to=new Date(todate).toLocaleString();
    TONGTIEN = 0;
    for (var i = 0; i < listDH.length; i++) {
        var d = listDH[i];
        if((from<d.ngaygio)&&(to>d.ngaygio))
        s += `<tr>
            <td style="width: 5%">` + (i+1) + `</td>
            <td style="width: 13%">` + d.ma + `</td>
            <td style="width: 7%">` + d.khach + `</td>
            <td style="width: 20%">` + d.sp + `</td>
            <td style="width: 15%">` + d.tongtien + `</td>
            <td style="width: 10%">` + d.ngaygio + `</td>
            <td style="width: 10%">` + d.tinhTrang + `</td>
            <td style="width: 10%">
                <div class="tooltip" onclick="duyet('`+d.ma+`', true)">
                    <i class="ti-check"></i>
                    <span class="tooltiptext">Duyệt</span>
                </div>
                <div class="tooltip" onclick="duyet('`+d.ma+`', false)">
                    <i class="ti-close"></i>
                    <span class="tooltiptext">Hủy</span>
                </div>
                
            </td>
        </tr>`;
        TONGTIEN += stringToNum(d.tongtien);
    }
    s += `</table>`;

    tc.innerHTML = s;
}
function timKiemTheoMa(list, ma) {
    for (var l of list) {
        if (l.masp == ma) return l;
    }
}
function getListDonHang(traVeDanhSachSanPham = false) {
    var u = getListUser();
    var result = [];
    for(var i = 0; i < u.length; i++) {
        for(var j = 0; j < u[i].donhang.length; j++) {
            // Tổng tiền
            var tongtien = 0;
            for(var s of u[i].donhang[j].sp) {
                var timsp = timKiemTheoMa(alcoholList, s.ma);
                tongtien += stringToNum(timsp.gia);
            }
            // Ngày giờ
            var x = new Date(u[i].donhang[j].ngaymua).toLocaleString();

            // Các sản phẩm - dạng html
            var sps = '';
            for(var s of u[i].donhang[j].sp) {
                sps += `<p style="text-align: center">`+(timKiemTheoMa(alcoholList, s.ma).tensp + ' [' + s.soluong + ']') + `</p>`;
            }

            // Các sản phẩm - dạng mảng
            var danhSachSanPham = [];
            for(var s of u[i].donhang[j].sp) {
                danhSachSanPham.push({
                    sanPham: timKiemTheoMa(alcoholList, s.ma),
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

//Khách Hàng=======================================================
function addTableKhachHang() {
    var tc = document.getElementsByClassName('khachhang')[0].getElementsByClassName('table-content')[0];
    var s = `<table class="table-outline hideImg">`;

    var listUser = getListUser();

    for (var i = 0; i < listUser.length; i++) {
        var u = listUser[i];
        s += `<tr>
            <td style="width: 5%">` + (i+1) + `</td>
            <td style="width: 15%">` + u.ho + ' ' + u.ten + `</td>
            <td style="width: 20%">` + u.email + `</td>
            <td style="width: 20%">` + u.username + `</td>
            <td style="width: 10%">` + u.pass + `</td>
            <td style="width: 10%">
                <div class="tooltip">
                    <label class="switch">
                        <input type="checkbox" `+(u.off?'':'checked')+` onclick="voHieuHoaNguoiDung(this, '`+u.username+`')">
                        <span class="slider round"></span>
                    </label>
                    <span class="tooltiptext">`+(u.off?'Mở':'Khóa')+`</span>
                </div>
                <div class="tooltip" onclick="xoaNguoiDung('`+u.username+`')">
                    <i class="fa fa-remove" "></i>
                    <span class="tooltiptext">Xóa</span>
                </div>
            </td>
        </tr>`;
    }

    s += `</table>`;
    tc.innerHTML = s;
}
function xoaNguoiDung(taikhoan) {
    if(window.confirm('Xác nhận xóa '+taikhoan+'? \nMọi dữ liệu về '+taikhoan+' sẽ mất! Bao gồm cả những đơn hàng của '+taikhoan)) {
        var listuser = getListUser();
        for(var i = 0; i < listuser.length; i++) {
            if(listuser[i].username == taikhoan) {
                listuser.splice(i, 1); // xóa
                setListUser(listuser); // lưu thay đổi
                localStorage.removeItem('CurrentUser'); // đăng xuất khỏi tài khoản hiện tại (current user)
                addTableKhachHang(); // vẽ lại bảng khách hàng
                addTableDonHang(); // vẽ lại bảng đơn hàng
                return;
            }
        }
    }
}
