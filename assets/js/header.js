function addheader(){
    document.write(`
        <div id="header" class="container">
            <div class="repo menu_repo" id="mobile-menu"> <i class="ti-menu menu-icon"></i></div>
            <a href="index.html" target="_parent" class="logo">
                <img src="assets/images/logowine.png" alt="">
            </a>
            <div id="menu">
                <div class="item">
                    <a href="./index.html">Trang chủ</a>
                </div>
                <div class="item">
                    <li>
                        <a href="./sanpham.html">Sản phẩm </a>
                    </li>
                </div>
                <div class="item">
                    <a href="#about">Giới Thiệu</a>
                </div>
                <div class="item">
                    <a href="#footer">Liên hệ</a>
                </div>
            </div>

            <div id="actions">
                <div class="user">
                    <a  onclick="checkTaiKhoan()">
                    <i class="ti-user" logOut()></i>
                    Tai Khoan
                    </a>
                    <a onclick="logOut()">| Đăng xuất</a>
                </div>
                <div class="cart">
                    <a href="giohang.html">
                    <i class="ti-shopping-cart"></i>
                    </a>
                </div>
            </div>
        </div>
`);
        var menu=document.getElementById('menu');
        var mobileMenu=document.getElementById('mobile-menu')

        var menuHeight=menu.clientHeight;
        mobileMenu.onclick=function(){
            var isClosed = menu.clientHeight===menuHeight;
            if(isClosed)menu.style.display='inline-block';
            else menu.style.display='none';
        }
addContainTaiKhoan();
setupEventTaiKhoan();
capNhat_ThongTin_CurrentUser();

}
function capNhat_ThongTin_CurrentUser() {
    var u = getCurrentUser();
    if (u) {
        // Cập nhật tên người dùng
        document.getElementsByClassName('user')[0].getElementsByTagName('a')[0].childNodes[2].nodeValue = ' ' + u.username;
    }
}