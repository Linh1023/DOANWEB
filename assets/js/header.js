function addheader(){

    document.write(`
        <div id="header" class="container">
            <a href="index.html" target="_parent" class="logo">
                <img src="assets/images/logowine.png" alt="">
            </a>
            <div id="menu">
                <div class="item">
                    <a href="./index.html">Trang chủ</a>
                </div>
                <div class="item">
                    <li>
                        <a href="./SanPham.html">Sản phẩm </a>
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
                    <a onclick="if(window.confirm('Xác nhận đăng xuất ?')) logOut();">| Đăng xuất</a>
                </div>
                <div class="cart">
                    <a  >
                    <i class="ti-shopping-cart"></i>
                    </a>
                </div>
            </div>
        </div>
`);
}