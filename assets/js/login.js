function User(username, pass, ho, ten, email, products, donhang) {
	this.ho = ho || '';
	this.ten = ten || '';
	this.email = email || '';

	this.username = username;
	this.pass = pass;
	this.products = products || [];
	this.donhang = donhang || [];
}
//hàm so sánh user
function equalUser(u1, u2) {
	return (u1.username == u2.username && u1.pass == u2.pass);
}

//
var adminInfo = [{
    "username": "admin",
    "pass": "nhom18"
}];



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


//đăng nhập
function logIn(form) {
    // Lấy dữ liệu từ form
    var name = form.username.value;
    var pass = form.pass.value;
    var newUser = new User(name, pass);

    // Lấy dữ liệu từ danh sách người dùng localstorage
    var listUser = getListUser();

    // Kiểm tra xem dữ liệu form có khớp với người dùng nào trong danh sách ko
    for (var u of listUser) {
        if (equalUser(newUser, u)) {
            if(u.off) {
                alert('Tài khoản này đang bị khoá. Không thể đăng nhập.');
                return false;
            }

            setCurrentUser(u);

            // Reload lại trang -> sau khi reload sẽ cập nhật luôn giỏ hàng khi hàm setupEventTaiKhoan chạy
            location.reload();
            return false;
        }
    }

    // Đăng nhập vào admin
    for (var ad of adminInfo) {
        if (equalUser(newUser, ad)) {
            alert('Xin chào admin .. ');
            window.localStorage.setItem('admin', true);
            window.location.assign('admin.html');
            return false;
        }
    }

    // Trả về thông báo nếu không khớp
    alert('Nhập sai tên hoặc mật khẩu !!!');
    form.username.focus();
    return false;
}

//Đăng kí
function signUp(form) {
    var ho = form.ho.value;
    var ten = form.ten.value;
    var email = form.email.value;
    var username = form.newUser.value;
    var pass = form.newPass.value;
    var newUser = new User(username, pass, ho, ten, email);

    // Lấy dữ liệu các khách hàng hiện có
    var listUser = getListUser();

    // Kiểm tra trùng admin
    for (var ad of adminInfo) {
        if (newUser.username == ad.username) {
            alert('Tên đăng nhập đã có người sử dụng !!');
            return false;
        }
    }

    // Kiểm tra xem dữ liệu form có trùng với khách hàng đã có không
    for (var u of listUser) {
        if (newUser.username == u.username) {
            alert('Tên đăng nhập đã có người sử dụng !!');
            return false;
        }
    }

    // Lưu người mới vào localstorage
    listUser.push(newUser);
    window.localStorage.setItem('ListUser', JSON.stringify(listUser));

    // Đăng nhập vào tài khoản mới tạo
    window.localStorage.setItem('CurrentUser', JSON.stringify(newUser));
    alert('Đăng kí thành công, Bạn sẽ được tự động đăng nhập!');
    location.reload();

    return false;
}

//ĐĂNG XUẤT
function logOut() {
    if (getCurrentUser()) {
        if(window.confirm('Xác nhận đăng xuất ?'))
        window.localStorage.removeItem('CurrentUser');
        location.reload();
    }
    else {alert("Bạn Chưa Đăng Nhập")}
}

// Hiển thị form tài khoản, giá trị truyền vào là true hoặc false
function showTaiKhoan(show) {
    var value = (show ? "scale(1)" : "scale(0)");
    var div = document.getElementsByClassName('containTaikhoan')[0];
    div.style.transform = value;
}

// Check xem có ai đăng nhập hay chưa (CurrentUser có hay chưa)
// Hàm này chạy khi ấn vào nút tài khoản trên header
function checkTaiKhoan() {
    if (!getCurrentUser()) {
        showTaiKhoan(true);
    }
    else
    alert("Đã Đăng Nhập <3")
}

// Tạo event, hiệu ứng cho form tài khoản

function setupEventTaiKhoan() {
    // Event chuyển tab login-signup
    var tab = document.getElementsByClassName('tab');
    for (var i = 0; i < tab.length; i++) {
        var a = tab[i].getElementsByTagName('a')[0];
        a.addEventListener('click', function (e) {
            e.preventDefault(); // tắt event mặc định

            // Thêm active(màu xanh lá) cho li chứa tag a này => ấn login thì login xanh, signup thì signup sẽ xanh
            this.parentElement.classList.add('active');

            // Sau khi active login thì phải tắt active sigup và ngược lại
            // Trường hợp a này thuộc login => <li>Login</li> sẽ có nextElement là <li>SignUp</li>
            if (this.parentElement.nextElementSibling) {
                this.parentElement.nextElementSibling.classList.remove('active');
            }
            // Trường hợp a này thuộc signup => <li>SignUp</li> sẽ có .previousElement là <li>Login</li>
            if (this.parentElement.previousElementSibling) {
                this.parentElement.previousElementSibling.classList.remove('active');
            }

            // Ẩn phần nhập của login nếu ấn signup và ngược lại
            // href của 2 tab signup và login là #signup và #login -> tiện cho việc getElement dưới đây
            var target = this.href.split('#')[1];
            document.getElementById(target).style.display = 'block';

            var hide = (target == 'login' ? 'signup' : 'login');
            document.getElementById(hide).style.display = 'none';
            
        })
    }
}

function addContainTaiKhoan() {
    document.write(`
	<div class="containTaikhoan">
    <div class="taikhoan">
    <span class="close ti-close" onclick="showTaiKhoan(false);"></span>

            <ul class="tab-group">
            <li class="tab active"><a href="#login">Đăng nhập</a></li>
            <li class="tab"><a href="#signup">Đăng kí</a></li>
        </ul> <!-- /tab group -->

            <div class="tab-content">
                <div id="login">
                    <h1>Chào mừng bạn trở lại!</h1>

                    <form onsubmit="return logIn(this);">

                        <div class="field-wrap">
                            <input name='username' type="text" required  placeholder="Tên Đăng Nhập..."/>
                        </div> <!-- /user name -->
                        <div class="field-wrap">
                            <input name="pass" type="password" required placeholder="Mật khẩu..." />
                        </div> <!-- pass -->
                        <p class="forgot"><a href="#">Quên mật khẩu?</a></p>

                        <button type="submit" class="button button-block" />Tiếp tục</button>

                    </form> <!-- /form -->

                </div> <!-- /log in -->

                <div id="signup">
                    <h1>Đăng kí miễn phí</h1>
                    <form onsubmit="return signUp(this);">
                        <div class="top-row">
                            <div class="field-wrap">
                                <input name="ho" type="text" required placeholder="Họ..." />
                            </div>
                            <div class="field-wrap">
                                <input name="ten" type="text" required placeholder="Tên..." />
                            </div>
                        </div> <!-- / ho ten -->

                        <div class="field-wrap">
                            <input name="email" type="email" required  placeholder="Email..."/>
                        </div> <!-- /email -->

                        <div class="field-wrap">
                            <input name="newUser" type="text" required  placeholder="Tên Đăng Nhập...">
                        </div> <!-- /user name -->

                        <div class="field-wrap">
                            <input name="newPass" type="password" required  placeholder="Mật Khẩu..."/>
                        </div> <!-- /pass -->

                        <button type="submit" class="button button-block" />Tạo tài khoản</button>

                    </form> <!-- /form -->

                </div> <!-- /sign up -->
            </div><!-- tab-content -->

        </div> <!-- /taikhoan -->
    </div>`);
}
function getCurrentUser() {
    return JSON.parse(window.localStorage.getItem('CurrentUser')); // Lấy dữ liệu từ localstorage
}
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