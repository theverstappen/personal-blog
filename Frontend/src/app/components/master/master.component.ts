import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;

@Component({
    selector: 'app-master',
    templateUrl: './master.component.html',
    styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {

    menu = [];
    defaultMenu = [
        { name: "Blog", link: "/" },
        { name: "Hesaplayıcılar", link: "/test" },
        { name: "Hakkında", link: "/test" }
    ];
    adminMenu = [
        { name: "Yazılar",link: "/admin" },
        { name: "Yeni Yazı ekle",link: "/admin/add-post" },
        { name: "Cikis yap",link: "/logout" }
    ]
    constructor(private router: Router, 
                private loginService : LoginService,
                private spinner: NgxSpinnerService) {

        if (this.router.url.startsWith("/admin")) {
            this.menu = this.adminMenu;
        }
        else {
            this.menu = this.defaultMenu;
        }
        console.log(this.menu[0].name)
    }

    ngOnInit() {
        $(document).ready(function () {
            $("#sidebar").mCustomScrollbar({
                theme: "minimal"
            });

            $('#dismiss, .overlay').on('click', function () {
                $('#sidebar').removeClass('active');
                $('.overlay').removeClass('active');
            });

            $('#sidebarCollapse').on('click', function () {
                $('#sidebar').addClass('active');
                $('.overlay').addClass('active');
                $('.collapse.in').toggleClass('in');
                $('a[aria-expanded=true]').attr('aria-expanded', 'false');
            });
        });
    }
    logout(){
        this.spinner.show();
        this.loginService.logout();
        setTimeout(() => {
            this.spinner.hide();
        
    }, 1000);
        this.router.navigate[''];
    }

}
