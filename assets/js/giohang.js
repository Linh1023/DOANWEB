var currentuser;
window.onload=function(){
	currentuser=getCurrentUser();
    addProductToTable(currentuser);
    addProductToTable1(currentuser);
}
function timKiemTheoMa(list, ma) {
    for (var l of list) {
        if (l.masp == ma) return l;
    }
}
//Danh Sách sảm phẩm trong giỏ hàng
function addProductToTable(user) {
	var table = document.getElementsByClassName('listSanPham')[0];
	var s = `
		<tbody>
			<tr class="sub-information">
				<th>STT</th>
				<th>Sản phẩm</th>
				<th>Giá</th>
				<th>Số lượng</th>
				<th>Thành tiền</th>
				<th>Thời gian</th>
				<th>Xóa</th>
			</tr>`;

	if (!user) {
		s += `
			<tr>
				<td colspan="7"> 
					<h1 style="color:red; background-color:white; font-weight:bold; text-align:center; padding: 15px 0;">
						Bạn chưa đăng nhập !!
					</h1> 
				</td>
			</tr>
		`;
		table.innerHTML = s;
		return;
	} else if (user.products.length == 0) {
		s += `
			<tr>
				<td colspan="7"> 
					<h1 style="color:green; background-color:yellow; font-weight:bold; text-align:center; padding: 15px 0;">
						Danh Sách Trống!!!
					</h1> 
				</td>
			</tr>
		`;
		table.innerHTML = s;
		return;
	}
	// lưu tổng tiền
	var totalPrice = 0;
    
    s+=`<table>`
	for (var i = 0; i < user.products.length; i++) {
		var masp = user.products[i].ma;
		var soluongSp = user.products[i].soluong;
		var p = timKiemTheoMa(alcoholList, masp);
		var thoigian = new Date(user.products[i].date).toLocaleString();
		var thanhtien = stringToNum(p.gia) * soluongSp;

		s += `

			<tr>
				<td>` + (i + 1) + `</td>
				<td >
				`+p.tensp+`
				</td>
				<td class="alignRight">` + p.gia + ` ₫</td>
				<td class="soluong" >
					<button onclick="giamSoLuong('` + masp + `')"><i class="ti-minus"></i></button>
					<input size="1"  value=` + soluongSp + `>
					<button onclick="tangSoLuong('` + masp + `')"><i class="ti-plus"></i></button>
				</td>
				<td class="alignRight">` + numToString(thanhtien) + ` ₫</td>
				<td style="text-align: center" >` + thoigian + `</td>
				<td > <i class="ti ti-trash" onclick="xoaSanPhamTrongGioHang(` + i + `)"></i> </td>
			</tr>
		`;
		// Chú ý nháy cho đúng ở giamsoluong, tangsoluong
		totalPrice += thanhtien;

	}
	s += `
			<tr style="font-weight:bold; text-align:center">
				<td colspan="4">TỔNG TIỀN: </td>
				<td class="alignRight">` + numToString(totalPrice) + ` ₫</td>
				<td class="thanhtoan" onclick="thanhToan();	currentuser=getCurrentUser();addProductToTable(currentuser);addProductToTable1(currentuser);	
				"> Thanh Toán </td>
				<td class="xoaHet" onclick="xoaHet()"> Xóa hết </td>
			</tr>
		</tbody>
	`;
	
    s+=`</table>`
    // document.write(s);
	table.innerHTML = s;
}
//Danh Sách sảm phẩm đã mua
function addProductToTable1(user) {
	var table = document.getElementsByClassName('listSanPhamDaMua')[0];
	var s = `
		<tbody>
			<tr class="sub-information">
				<th>ID</th>
				<th>Tên Sản phẩm</th>
				<th>Số lượng</th>
				<th>Giá tiền</th>
				<th>Tổng Tiền</th>
				<th>Thanh toán lúc</th>
			</tr>`;

	if (!user) {
		s += `
			<tr>
				<td colspan="7"> 
					<h1 style="color:red; background-color:white; font-weight:bold; text-align:center; padding: 15px 0;">
						Bạn chưa đăng nhập !!
					</h1> 
				</td>
			</tr>
		`;
		table.innerHTML = s;
		return;
	} else if (user.donhang.length == 0) {
		s += `
			<tr>
				<td colspan="7"> 
					<h1 style="color:green; background-color:yellow; font-weight:bold; text-align:center; padding: 15px 0;">
						Danh Sách Trống !!
					</h1> 
				</td>
			</tr>
		`;
		table.innerHTML = s;
		return;
	}
	// lưu tổng tiền
	var totalPrice = 0;
    
    s+=`<table>`
	for (var i = 0; i < user.donhang.length; i++) {
		for(var j = 0;j<user.donhang[i].sp.length;j++){
			var masp = user.donhang[i].sp[j].ma;
			var soluongSp = user.donhang[i].sp[j].soluong;
			var p = timKiemTheoMa(alcoholList, masp);
			// var thoigiandat = new Date(user.donhang[i].ngaymua).toLocaleString();
			var thoigianduyet = new Date(user.donhang[i].sp[0].date).toLocaleString();
			var thanhtien = stringToNum(p.gia) * soluongSp;

			s += `
				<tr>
					<td>` + (i + 1) + `</td>
					<td >
					`+p.tensp+`
					</td>
					<td class="soluong" >
						` + soluongSp + `
					</td>
					<td class="alignRight">` + p.gia + ` ₫</td>
					<td class="alignRight">` + numToString(thanhtien) + ` ₫</td>
					<td style="text-align: center" >` + thoigianduyet + `</td>
				</tr>
			`;
			// Chú ý nháy cho đúng ở giamsoluong, tangsoluong
			totalPrice += thanhtien;
		}
	}
	s += `
			<tr style="font-weight:bold; text-align:center">
				<td colspan="4">TỔNG TIỀN ĐÃ MUA: </td>
				<td class="alignRight">` + numToString(totalPrice) + ` ₫</td>
				<td ></td>
				<td ></td>
			</tr>
		</tbody>
	`;
    s+=`</table>`
    // document.write(s);
	table.innerHTML = s;
}
////////////////////////////////////////////

function numToString(num, char) {
    return num.toLocaleString().split(',').join(char || '.');
}

function stringToNum(str, char) {
    return Number(str.split(char || '.').join(''));
}

function xoaSanPhamTrongGioHang(i) {
	if (window.confirm('Xác nhận hủy mua')) {
		currentuser.products.splice(i, 1);
		capNhatMoiThu();
	}
}

// Sau khi chỉnh sửa 1 user 'u' thì cần hàm này để cập nhật lại vào ListUser
function updateListUser(u, newData) {
    var list = getListUser();
    for (var i = 0; i < list.length; i++) {
        if (equalUser(u, list[i])) {
            list[i] = (newData ? newData : u);
        }
    }
    setListUser(list);
}
//
// Hàm get set cho người dùng hiện tại đã đăng nhập
function getCurrentUser() {
    return JSON.parse(window.localStorage.getItem('CurrentUser')); // Lấy dữ liệu từ localstorage
}

function setCurrentUser(u) {
    window.localStorage.setItem('CurrentUser', JSON.stringify(u));
}

// Hàm get set cho danh sách người dùng
function getListUser() {
    var data = JSON.parse(window.localStorage.getItem('ListUser')) || []
    var l = [];
    for (var d of data) {
        l.push(d);
    }
    return l;
}
function setListUser(l) {
    window.localStorage.setItem('ListUser', JSON.stringify(l));
}


function thanhToan() {
	var c_user = getCurrentUser();
	if(c_user.off) {
        alert('Tài khoản của bạn hiện đang bị khóa nên không thể mua hàng!');
        addmess('Tài khoản của bạn đã bị khóa bởi Admin.', '#aa0000', '#fff', 10000);
        return;
	}
	
	if (window.confirm('Thanh toán giỏ hàng ?')) {
		currentuser.donhang.push({
			"sp": currentuser.products,
			"ngaymua": new Date(),
			"tinhTrang": 'Đang chờ xử lý'
		});
		currentuser.products = [];
		capNhatMoiThu();
		addmess('Các sản phẩm đã được gửi vào đơn hàng và chờ xử lý.', '#17c671', '#fff', 4000);
	
	}
}

function xoaHet() {
	if (currentuser.products.length) {
		if (window.confirm('Bạn có chắc chắn muốn xóa hết sản phẩm trong giỏ !!')) {
			currentuser.products = [];
			capNhatMoiThu();
		}
	}
}

// Cập nhật số lượng lúc nhập số lượng vào input
function capNhatSoLuongFromInput(inp, masp) {
	var soLuongMoi = Number(inp.value);
	if (!soLuongMoi || soLuongMoi <= 0) soLuongMoi = 1;

	for (var p of currentuser.products) {
		if (p.ma == masp) {
			p.soluong = soLuongMoi;
		}
	}

	capNhatMoiThu();
}

function tangSoLuong(masp) {
	for (var p of currentuser.products) {
		if (p.ma == masp) {
			p.soluong++;
		}
	}
	capNhatMoiThu();
}

function giamSoLuong(masp) {
	for (var p of currentuser.products) {
		if (p.ma == masp) {
			if (p.soluong > 1) {
				p.soluong--;
			} else {
				return;
			}
		}
	}
	capNhatMoiThu();
}

function capNhatMoiThu() { // Mọi thứ
	// cập nhật danh sách sản phẩm trong localstorage
	setCurrentUser(currentuser);
	updateListUser(currentuser);
	// cập nhật danh sách sản phẩm ở table
	addProductToTable(currentuser);

	// Cập nhật trên header
}
function addmess(text, bgcolor, textcolor, time) {
    var al = document.getElementById('message');
    var a = document.getElementById('hihi');
    a.innerHTML = text;

    al.style.backgroundColor = bgcolor;
    al.style.opacity = 1;
    al.style.zIndex = 200;

    if (textcolor) al.style.color = textcolor;
    if (time)
        setTimeout(function () {
            al.style.opacity = 0;
            al.style.zIndex = 0;
        }, time);
}