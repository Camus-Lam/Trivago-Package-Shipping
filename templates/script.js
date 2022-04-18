var is_imperial = true

function get_weight_unit() {
    if (is_imperial === true) {
        return "lb";
    } else {
        return "kg";
    }
}

function swap_units() {
    is_imperial = !is_imperial;

    if (is_imperial) {
        document.getElementById('unit-btn').innerHTML = 'Imperial Units';
    } else {
        document.getElementById('unit-btn').innerHTML = 'Metric Units';
    }

    add_packages();
    measurements();
    weight_values();
    pack_details_unit();
}

function get_measurement_unit() {
    if (is_imperial === true) {
        return "in";
    } else {
        return "cm";
    }
}

function change_button(button, button1) {
    document.getElementsByClassName(button)[0].style.backgroundColor = "#B58F68"
    document.getElementsByClassName(button1)[0].style.backgroundColor = "#805E3C"
}

function package(h, w, l) {
    this.h = h;
    this.w = w;
    this.l = l;
}

var current_package_global = 0
var packages_global = [];
// This is for sorting 0 means asc and 1 desc
var sorting = {
    "carrier": 0,
    "branch": 0,
    "price": 0
};


function store(current_package, packages) {
    window.sessionStorage.setItem("current_package_local", JSON.stringify(current_package));
    window.sessionStorage.setItem("package_list_local", JSON.stringify(packages));
}

function bus_package_detail() {

    var current_package_index = JSON.parse(window.sessionStorage.getItem("current_package_local"));
    var packages = JSON.parse(window.sessionStorage.getItem("package_list_local"));
    var current_package = packages[current_package_index];

    var h = document.getElementById('height').value;
    var w = document.getElementById('width').value;
    var l = document.getElementById('length').value;
    var weight = document.getElementById('weight').value;

    if (h === "" || w === "" || l === "" || weight === "") {
        document.getElementById('error1').innerHTML = "Please input all the fields"
    }
    else {
        var new_package = new package(h, w, l);
        new_package.weight = weight;

        packages.push(new_package);
        current_package = new_package;

        current_package_index = packages.length - 1;


        store(current_package_index, packages)

        console.log(JSON.parse(window.sessionStorage.getItem("current_package_local")))
        var type = window.sessionStorage.getItem("personalOrBus");
        if (type === "personal")
            window.location.href = './weight.html'
        else
            window.location.href = './from_address.html'
        
    }
}

function per_package_detail() {
    var current_package_index = JSON.parse(window.sessionStorage.getItem("current_package_local"));
    var packages = JSON.parse(window.sessionStorage.getItem("package_list_local"));
    var current_package = packages[current_package_index];

    var select = document.getElementsByClassName('img-btn');

    if (select[0].style.backgroundColor == "" && select[1].style.backgroundColor == "" && select[2].style.backgroundColor == "") {
        document.getElementById('error4').innerHTML = "Please input all the fields"
    }
    else {
        var h = 1;
        var w = 1;
        var l = 4;
        if (select[1].style.backgroundColor === "rgb(99, 65, 31)"){
            h = 10;
            w = 10;
            l = 10;
        }
        if (select[2].style.backgroundColor === "rgb(99, 65, 31)"){
            h = 25;
            w = 25;
            l = 25;
        }
        var new_package = new package(h, w, l);

        packages.push(new_package);
        current_package = new_package;

        current_package_index = packages.length - 1;


        store(current_package_index, packages)

        console.log(JSON.parse(window.sessionStorage.getItem("current_package_local")))
        window.location.href = './weight.html'
    }

}
function previous_bus_pack() {
    var current_package_index = JSON.parse(window.sessionStorage.getItem("current_package_local"));
    var packages = JSON.parse(window.sessionStorage.getItem("package_list_local"));
    var previous = packages[current_package_index - 1]


    if (current_package_index - 1 < 0) {
        document.getElementById('error1').innerHTML = "There are no data for previous sessions"
    }
    else {
        document.getElementById('height').value = previous.h;
        document.getElementById('width').value = previous.w;
        document.getElementById('length').value = previous.l;
        document.getElementById('weight').value = previous.weight;
    }
}

function from_address() {
    var current_package_index = JSON.parse(window.sessionStorage.getItem("current_package_local"));
    var packages = JSON.parse(window.sessionStorage.getItem("package_list_local"));
    var current_package = packages[current_package_index];

    console.log(current_package)

    var address = document.getElementById('from_address').value;
    var town = document.getElementById('town_city').value;
    var country = document.getElementById('country').value;
    var postal = document.getElementById('postal').value;

    if (address === "" || town === "" || country === "" || postal === "") {
        document.getElementById('error2').innerHTML = "Please input all the fields"
    }
    else {
        current_package.from_address = address;
        current_package.from_town = town;
        current_package.from_country = country;
        current_package.from_postal = postal;

        packages[current_package_index] = current_package;


        store(current_package_index, packages)

        var type = window.sessionStorage.getItem("personalOrBus");
        if (type === "personal")
            window.location.href = './per_dest_address.html'
        else
            window.location.href = './dest_address.html'
    }
}

function back_home() {
    window.location.href = './Home.html'
}

function previous_from_address() {
    var current_package_index = JSON.parse(window.sessionStorage.getItem("current_package_local"));
    var packages = JSON.parse(window.sessionStorage.getItem("package_list_local"));
    var previous = packages[current_package_index - 1]
    console.log(previous)
    if (current_package_index - 1 < 0) {
        document.getElementById('error2').innerHTML = "There are no data for previous sessions"
    }
    else {
        document.getElementById('from_address').value = previous.from_address;
        document.getElementById('town_city').value = previous.from_town;
        document.getElementById('country').value = previous.from_country;
        document.getElementById('postal').value = previous.from_postal;
    }
}

function dest_address() {
    var current_package_index = JSON.parse(window.sessionStorage.getItem("current_package_local"));
    var packages = JSON.parse(window.sessionStorage.getItem("package_list_local"));
    var current_package = packages[current_package_index];

    console.log(current_package)

    var address = document.getElementById('to_address').value;
    var town = document.getElementById('to_town_city').value;
    var country = document.getElementById('to_country').value;
    var postal = document.getElementById('to_postal').value;

    if (address === "" || town === "" || country === "" || postal === "") {
        document.getElementById('error2').innerHTML = "Please input all the fields"
    }
    else {
        current_package.to_address = address;
        current_package.to_town = town;
        current_package.to_country = country;
        current_package.to_postal = postal;

        packages[current_package_index] = current_package;

        store(current_package_index, packages)
        var type = window.sessionStorage.getItem("personalOrBus");
        if (type === "personal")
            window.location.href = './track.html'
        else
            window.location.href = './track_fragile.html'
    }
}

function previous_dest_address() {
    var current_package_index = JSON.parse(window.sessionStorage.getItem("current_package_local"));
    var packages = JSON.parse(window.sessionStorage.getItem("package_list_local"));
    var previous = packages[current_package_index - 1]
    console.log(current_package_index)
    if (current_package_index - 1 < 0) {
        document.getElementById('error2').innerHTML = "There are no data for previous sessions"
    }
    else {
        document.getElementById('to_address').value = previous.to_address;
        document.getElementById('to_town_city').value = previous.to_town;
        document.getElementById('to_country').value = previous.to_country;
        document.getElementById('to_postal').value = previous.to_postal;
    }
}

function add_packages() {
    if (document.getElementById('cart')) {
        var packages = JSON.parse(window.sessionStorage.getItem("package_list_local"));
        var ele = document.getElementById('cart');
        ele.innerHTML = "";

        for (var i = 0; i < packages.length; i++) {
            ele.innerHTML += "<p class='package'>" + packages[i].l + get_measurement_unit() + " x " + packages[i].w + get_measurement_unit() + " x "
                + packages[i].h + get_measurement_unit() + " - " + packages[i].weight + get_weight_unit() + " - " + packages[i].to_postal + "</p>";
        }
        console.log("fds")
    }
}

function weight_values() {

    if (document.getElementById('weight-text')) {
        var text;
        if (is_imperial === true) {
            text = "pounds";
        } else {
            text = "kilograms";
        }
        document.getElementById('weight-text').innerHTML = "The weight of my package is (in " + text + ")";
    }
}

function measurements() {

    if (document.getElementById('hwl')) {
        var unit = get_measurement_unit();
        var weight = get_weight_unit();
        document.getElementById('length').placeholder = "Length (" + unit + ")";
        document.getElementById('width').placeholder  = "Width (" + unit + ")";
        document.getElementById('height').placeholder = "Height (" + unit + ")";
        document.getElementById('weight').placeholder = "Weight (" + weight + ")";
    }
}

function pack_details_unit() {

    if (document.getElementById('box-text1')) {
        var unit = get_measurement_unit();
        document.getElementById('box-text1').innerHTML = "(1" + unit + "x1" + unit + "x1" + unit + ")";
        document.getElementById('box-text2').innerHTML  = "(10" + unit + "x10" + unit + "x10" + unit + ")";
        document.getElementById('box-text3').innerHTML = "(23" + unit + "x23" + unit + "x23" + unit + ")";
    }
}



window.onload = function doitall() {
    add_packages();
    weight_values();
    measurements();
    pack_details_unit();
}

function set_type(type) {
    store(current_package_global, packages_global);
    window.sessionStorage.setItem("personalOrBus", type);
    if (type == "personal")
        window.location.href = './package_details_per.html'
    else
        window.location.href = './package_details_bus.html'
}

function new_package() {
    var type = window.sessionStorage.getItem("personalOrBus");

    var current_package_index = JSON.parse(window.sessionStorage.getItem("current_package_local"));
    var packages = JSON.parse(window.sessionStorage.getItem("package_list_local"));
    store(current_package_index + 1, packages)

    if (type == "personal")
        window.location.href = './package_details_per.html'
    else
        window.location.href = './package_details_bus.html'

}

function slider() {
    var weight = document.getElementById('weight_slider').value;
    document.getElementById('weight_per').value = weight / 10;
    document.getElementById('weight_per').style.color = '#ffffff';
}

function per_package_weight() {
    var current_package_index = JSON.parse(window.sessionStorage.getItem("current_package_local"));
    var packages = JSON.parse(window.sessionStorage.getItem("package_list_local"));
    var current_package = packages[current_package_index];

    console.log(current_package)

    var weight = document.getElementById('weight_per').value;

    if (weight === "") {
        weight = 5;
        //document.getElementById('error3').innerHTML = "Please input the weight"
    }

    current_package.weight = weight;

    packages[current_package_index] = current_package;

    store(current_package_index, packages)
    window.location.href = './per_from_address.html'

}

function opencarrier(num) {
    if (num == 1) {
        window.open("https://www.canadapost-postescanada.ca/cpc/en/home.page");
    }
    else if (num == 2) {
        window.open("https://www.ups.com/ca/en/Home.page");
    }
    else if (num == 3) {
        window.open("https://sellercentral.amazon.ca/");
    }
    else {
        window.open("https://www.purolator.com/en");
    }
}

function opencarrier(num) {
    if (num == 1) {
        window.open("https://www.canadapost-postescanada.ca/cpc/en/home.page");
    }
    else if (num == 2) {
        window.open("https://www.ups.com/ca/en/Home.page");
    }
    else if (num == 3) {
        window.open("https://sellercentral.amazon.ca/");
    }
    else {
        window.open("https://www.purolator.com/en");
    }
}

function sort(num) {
    var text = document.getElementById('carrier-body')
    if (num === 1) {
        if (sorting["carrier"] == 0) {
            text.innerHTML = carrier_asc;
            sorting["carrier"] = 1;

        }
        else if (sorting["carrier"] == 1) {
            text.innerHTML = carrier_desc;
            sorting["carrier"] = 2;            
        }
        else {
            text.innerHTML = home_sort;
            sorting["carrier"] = 0;   
        }
    }
    else if (num===2){
        if (sorting["branch"] == 0) {
            text.innerHTML = branch_asc;
            sorting["branch"] = 1;
        }
        else if (sorting["branch"] == 1) {
            text.innerHTML = branch_desc;
            sorting["branch"] = 2;
        }
        else {
            text.innerHTML = home_sort;
            sorting["branch"] = 0;
        }
    }
    else {
        if (sorting["price"] == 0) {
            text.innerHTML = price_asc;
            sorting["price"] = 1;

        }
        else if (sorting["price"] == 1) {
            text.innerHTML = price_desc;
            sorting["price"] = 2;            
        }
        else {
            text.innerHTML = home_sort;
            sorting["price"] = 0;   
        }
    }
    reset_other(num);
}

function reset_other(num) {
    if (num === 1) {
        sorting["branch"] = 0;
        sorting["price"] = 0;
    }
    if (num === 2) {
        sorting["carrier"] = 0;
        sorting["price"] = 0;
    }
    if (num === 3) {
        sorting["carrier"] = 0;
        sorting["branch"] = 0;
    }
}

var carrier_asc = `     <table id="tableheader" class="carrier-list" style="width:90%">
            <thead>
                <tr><th>
                    <div><img id="carrier_sort" src="../static/assets/carrier_asc_on.png" onmouseover="this.src='../static/assets/carrier_asc_hover.png'" onmouseout="this.src='../static/assets/carrier_asc_on.png'" onclick="sort(1)"></th><th id="branch"><img id="branch_sort" src="../static/assets/branch_asc.png" onmouseover="this.src='../static/assets/branch_asc_hover.png'" onmouseout="this.src='../static/assets/branch_asc.png'" onclick="sort(2)"></th><th id="price"><img id="price_sort" src="../static/assets/price_asc.png" onmouseover="this.src='../static/assets/price_asc_hover.png'" onmouseout="this.src='../static/assets/price_asc.png'" onclick="sort(3)"></th></tr>
            </thead>
                <tbody>
                    <tr onclick="opencarrier(1)"><td style="text-align: center;border-bottom: 0;">Canada Post Regular</td><td style="text-align: center;border-bottom: 0;">2 km</td><td rowspan="2" style="text-align: right"><img src="../static/assets/mag_glass_dark.png" style="vertical-align: middle;width:25px;height:25px;"><img src="../static/assets/instore_pickup_dark.png" style="vertical-align: middle;width:25px;height:25px;">$10.99</td></tr>
                    <tr><td style="text-align: center;border-top: 0;" onclick="open_review(1)">5 <img src="../static/assets/5stars_dark.png" style="vertical-align: middle;width:200px;height:38px"></td><td style="text-align: center;border-top: 0;">123 Street, ON J7F 9J6</td></tr>
                </tbody>
                <tbody>
                    <tr onclick="opencarrier(4)"><td style="text-align: center;border-bottom: 0;">Purolator</td><td style="text-align: center;border-bottom: 0;">5 km</td><td style="text-align: right;border-bottom: 0;color: #FFBBBB"><img src="../static/assets/mag_glass_red_light.png" style="vertical-align: middle;width:25px;height:25px;">$17.99</td></tr>
                    <tr><td style="text-align: center;border-top: 0;" onclick="open_review(5)">7 <img src="../static/assets/4stars_light.png" style="vertical-align: middle;width:200px;height:38px"></td><td style="text-align: center;border-top: 0;">49 Avenue, ON K2A 3C6</td><td style="text-align: right;border-top: 0;color: #FFBBBB" onclick="openModal(2)">Promotion Available</td></tr>
                </tbody>
                <tbody>
                    <tr onclick="opencarrier(2)"><td style="text-align: center;border-bottom: 0;">UPS Premium</td><td style="text-align: center;border-bottom: 0;">3 km</td><td style="text-align: right;border-bottom: 0;color: #FFBBBB">$15.99</td></tr>
                    <tr><td style="text-align: center;border-top: 0;" onclick="open_review(4)">9 <img src="../static/assets/3stars_dark.png" style="vertical-align: middle;width:200px;height:38px"></td><td style="text-align: center;border-top: 0;">100 Avenue, ON K8A 5B7</td><td style="text-align: right;border-top: 0;color: #FFBBBB" onclick="openModal(1)">Promotion Available</td></tr>
                </tbody>
                <tbody>
                    <tr onclick="opencarrier(2)"><td style="text-align: center;border-bottom: 0;">UPS Express</td><td style="text-align: center;border-bottom: 0;">3 km</td><td rowspan="2" style="text-align: right">$8.99</td></tr>
                    <tr><td style="text-align: center;border-top: 0;" onclick="open_review(2)">8 <img src="../static/assets/3stars_light.png" style="vertical-align: middle;width:200px;height:38px;"></td><td style="text-align: center;border-top: 0;">100 Avenue, ON K8A 5B7</td></tr>
                </tbody>
                <tbody>
                    <tr onclick="opencarrier(3)"><td style="text-align: center;border-bottom: 0;">Amazon</td><td style="text-align: center;border-bottom: 0;">2.3 km</td><td rowspan="2" style="text-align: right"><img src="../static/assets/instore_pickup_dark.png" style="vertical-align: middle;width:25px;height:25px;">$9.99</td></tr>
                    <tr><td style="text-align: center;border-top: 0;" onclick="open_review(3)">5 <img src="../static/assets/2stars_dark.png" style="vertical-align: middle;width:200px;height:38px"></td><td style="text-align: center;border-top: 0;">143 Avenue, ON K1B 6F2</td></tr>
                </tbody>
    </table>`;
var carrier_desc = `        <table id="tableheader" class="carrier-list" style="width:90%">
            <thead>
                <tr><th>
                    <div><img id="carrier_sort" src="../static/assets/carrier_desc_on.png" onmouseover="this.src='../static/assets/carrier_desc_hover.png'" onmouseout="this.src='../static/assets/carrier_desc_on.png'" onclick="sort(1)"></th><th id="branch"><img id="branch_sort" src="../static/assets/branch_asc.png" onmouseover="this.src='../static/assets/branch_asc_hover.png'" onmouseout="this.src='../static/assets/branch_asc.png'" onclick="sort(2)"></th><th id="price"><img id="price_sort" src="../static/assets/price_asc.png" onmouseover="this.src='../static/assets/price_asc_hover.png'" onmouseout="this.src='../static/assets/price_asc.png'" onclick="sort(3)"></th></tr>
            </thead>
                <tbody>
                    <tr onclick="opencarrier(3)"><td style="text-align: center;border-bottom: 0;">Amazon</td><td style="text-align: center;border-bottom: 0;">2.3 km</td><td rowspan="2" style="text-align: right"><img src="../static/assets/instore_pickup_dark.png" style="vertical-align: middle;width:25px;height:25px;">$9.99</td></tr>
                    <tr><td style="text-align: center;border-top: 0;" onclick="open_review(3)">5 <img src="../static/assets/2stars_dark.png" style="vertical-align: middle;width:200px;height:38px"></td><td style="text-align: center;border-top: 0;">143 Avenue, ON K1B 6F2</td></tr>
                </tbody>
                <tbody>
                    <tr onclick="opencarrier(2)"><td style="text-align: center;border-bottom: 0;">UPS Express</td><td style="text-align: center;border-bottom: 0;">3 km</td><td rowspan="2" style="text-align: right">$8.99</td></tr>
                    <tr><td style="text-align: center;border-top: 0;" onclick="open_review(2)">8 <img src="../static/assets/3stars_light.png" style="vertical-align: middle;width:200px;height:38px;"></td><td style="text-align: center;border-top: 0;">100 Avenue, ON K8A 5B7</td></tr>
                </tbody>
                <tbody>
                    <tr onclick="opencarrier(2)"><td style="text-align: center;border-bottom: 0;">UPS Premium</td><td style="text-align: center;border-bottom: 0;">3 km</td><td style="text-align: right;border-bottom: 0;color: #FFBBBB">$15.99</td></tr>
                    <tr><td style="text-align: center;border-top: 0;" onclick="open_review(4)">9 <img src="../static/assets/3stars_dark.png" style="vertical-align: middle;width:200px;height:38px"></td><td style="text-align: center;border-top: 0;">100 Avenue, ON K8A 5B7</td><td style="text-align: right;border-top: 0;color: #FFBBBB" onclick="openModal(1)">Promotion Available</td></tr>
                </tbody>
                <tbody>
                    <tr onclick="opencarrier(4)"><td style="text-align: center;border-bottom: 0;">Purolator</td><td style="text-align: center;border-bottom: 0;">5 km</td><td style="text-align: right;border-bottom: 0;color: #FFBBBB"><img src="../static/assets/mag_glass_red_light.png" style="vertical-align: middle;width:25px;height:25px;">$17.99</td></tr>
                    <tr><td style="text-align: center;border-top: 0;" onclick="open_review(5)">7 <img src="../static/assets/4stars_light.png" style="vertical-align: middle;width:200px;height:38px"></td><td style="text-align: center;border-top: 0;">49 Avenue, ON K2A 3C6</td><td style="text-align: right;border-top: 0;color: #FFBBBB" onclick="openModal(2)">Promotion Available</td></tr>
                </tbody>
                <tbody>
                    <tr onclick="opencarrier(1)"><td style="text-align: center;border-bottom: 0;">Canada Post Regular</td><td style="text-align: center;border-bottom: 0;">2 km</td><td rowspan="2" style="text-align: right"><img src="../static/assets/mag_glass_dark.png" style="vertical-align: middle;width:25px;height:25px;"><img src="../static/assets/instore_pickup_dark.png" style="vertical-align: middle;width:25px;height:25px;">$10.99</td></tr>
                    <tr><td style="text-align: center;border-top: 0;" onclick="open_review(1)">5 <img src="../static/assets/5stars_dark.png" style="vertical-align: middle;width:200px;height:38px"></td><td style="text-align: center;border-top: 0;">123 Street, ON J7F 9J6</td></tr>
                </tbody>
    </table>`;
var branch_asc = `        <table id="tableheader" class="carrier-list" style="width:90%">
            <thead>
                <tr><th>
                    <div><img id="carrier_sort" src="../static/assets/carrier_asc.png" onmouseover="this.src='../static/assets/carrier_asc_hover.png'" onmouseout="this.src='../static/assets/carrier_asc.png'" onclick="sort(1)"></th><th id="branch"><img id="branch_sort" src="../static/assets/branch_asc_on.png" onmouseover="this.src='../static/assets/branch_asc_hover.png'" onmouseout="this.src='../static/assets/branch_asc_on.png'" onclick="sort(2)"></th><th id="price"><img id="price_sort" src="../static/assets/price_asc.png" onmouseover="this.src='../static/assets/price_asc_hover.png'" onmouseout="this.src='../static/assets/price_asc.png'" onclick="sort(3)"></th></tr>
            </thead>
                <tbody>
                    <tr onclick="opencarrier(1)"><td style="text-align: center;border-bottom: 0;">Canada Post Regular</td><td style="text-align: center;border-bottom: 0;">2 km</td><td rowspan="2" style="text-align: right"><img src="../static/assets/mag_glass_dark.png" style="vertical-align: middle;width:25px;height:25px;"><img src="../static/assets/instore_pickup_dark.png" style="vertical-align: middle;width:25px;height:25px;">$10.99</td></tr>
                    <tr><td style="text-align: center;border-top: 0;" onclick="open_review(1)">5 <img src="../static/assets/5stars_dark.png" style="vertical-align: middle;width:200px;height:38px"></td><td style="text-align: center;border-top: 0;">123 Street, ON J7F 9J6</td></tr>
                </tbody>
                <tbody>
                    <tr onclick="opencarrier(3)"><td style="text-align: center;border-bottom: 0;">Amazon</td><td style="text-align: center;border-bottom: 0;">2.3 km</td><td rowspan="2" style="text-align: right"><img src="../static/assets/instore_pickup_light.png" style="vertical-align: middle;width:25px;height:25px;">$9.99</td></tr>
                    <tr><td style="text-align: center;border-top: 0;" onclick="open_review(3)">5 <img src="../static/assets/2stars_light.png" style="vertical-align: middle;width:200px;height:38px"></td><td style="text-align: center;border-top: 0;">143 Avenue, ON K1B 6F2</td></tr>
                </tbody>
                <tbody>
                    <tr onclick="opencarrier(2)"><td style="text-align: center;border-bottom: 0;">UPS Express</td><td style="text-align: center;border-bottom: 0;">3 km</td><td rowspan="2" style="text-align: right">$8.99</td></tr>
                    <tr><td style="text-align: center;border-top: 0;" onclick="open_review(2)">8 <img src="../static/assets/3stars_dark.png" style="vertical-align: middle;width:200px;height:38px;"></td><td style="text-align: center;border-top: 0;">100 Avenue, ON K8A 5B7</td></tr>
                </tbody>
                <tbody>
                    <tr onclick="opencarrier(2)"><td style="text-align: center;border-bottom: 0;">UPS Premium</td><td style="text-align: center;border-bottom: 0;">3 km</td><td style="text-align: right;border-bottom: 0;color: #FFBBBB">$15.99</td></tr>
                    <tr><td style="text-align: center;border-top: 0;" onclick="open_review(4)">9 <img src="../static/assets/3stars_light.png" style="vertical-align: middle;width:200px;height:38px"></td><td style="text-align: center;border-top: 0;">100 Avenue, ON K8A 5B7</td><td style="text-align: right;border-top: 0;color: #FFBBBB" onclick="openModal(1)">Promotion Available</td></tr>
                </tbody>
                <tbody>
                    <tr onclick="opencarrier(4)"><td style="text-align: center;border-bottom: 0;">Purolator</td><td style="text-align: center;border-bottom: 0;">5 km</td><td style="text-align: right;border-bottom: 0;color: #FFBBBB"><img src="../static/assets/mag_glass_red_dark.png" style="vertical-align: middle;width:25px;height:25px;">$17.99</td></tr>
                    <tr><td style="text-align: center;border-top: 0;" onclick="open_review(5)">7 <img src="../static/assets/4stars_dark.png" style="vertical-align: middle;width:200px;height:38px"></td><td style="text-align: center;border-top: 0;">49 Avenue, ON K2A 3C6</td><td style="text-align: right;border-top: 0;color: #FFBBBB" onclick="openModal(2)">Promotion Available</td></tr>
                </tbody>
    </table>`;
var branch_desc = `        <table id="tableheader" class="carrier-list" style="width:90%">
            <thead>
                <tr><th>
                    <div><img id="carrier_sort" src="../static/assets/carrier_asc.png" onmouseover="this.src='../static/assets/carrier_asc_hover.png'" onmouseout="this.src='../static/assets/carrier_asc.png'" onclick="sort(1)"></th><th id="branch"><img id="branch_sort" src="../static/assets/branch_desc_on.png" onmouseover="this.src='../static/assets/branch_desc_hover.png'" onmouseout="this.src='../static/assets/branch_desc_on.png'" onclick="sort(2)"></th><th id="price"><img id="price_sort" src="../static/assets/price_asc.png" onmouseover="this.src='../static/assets/price_asc_hover.png'" onmouseout="this.src='../static/assets/price_asc.png'" onclick="sort(3)"></th></tr>
            </thead>
                <tbody>
                    <tr onclick="opencarrier(4)"><td style="text-align: center;border-bottom: 0;">Purolator</td><td style="text-align: center;border-bottom: 0;">5 km</td><td style="text-align: right;border-bottom: 0;color: #FFBBBB"><img src="../static/assets/mag_glass_red_dark.png" style="vertical-align: middle;width:25px;height:25px;">$17.99</td></tr>
                    <tr><td style="text-align: center;border-top: 0;" onclick="open_review(5)">7 <img src="../static/assets/4stars_dark.png" style="vertical-align: middle;width:200px;height:38px"></td><td style="text-align: center;border-top: 0;">49 Avenue, ON K2A 3C6</td><td style="text-align: right;border-top: 0;color: #FFBBBB" onclick="openModal(2)">Promotion Available</td></tr>
                </tbody>
                <tbody>
                    <tr onclick="opencarrier(2)"><td style="text-align: center;border-bottom: 0;">UPS Premium</td><td style="text-align: center;border-bottom: 0;">3 km</td><td style="text-align: right;border-bottom: 0;color: #FFBBBB">$15.99</td></tr>
                    <tr><td style="text-align: center;border-top: 0;" onclick="open_review(4)">9 <img src="../static/assets/3stars_light.png" style="vertical-align: middle;width:200px;height:38px"></td><td style="text-align: center;border-top: 0;">100 Avenue, ON K8A 5B7</td><td style="text-align: right;border-top: 0;color: #FFBBBB" onclick="openModal(1)">Promotion Available</td></tr>
                </tbody>
                <tbody>
                    <tr onclick="opencarrier(2)"><td style="text-align: center;border-bottom: 0;">UPS Express</td><td style="text-align: center;border-bottom: 0;">3 km</td><td rowspan="2" style="text-align: right">$8.99</td></tr>
                    <tr><td style="text-align: center;border-top: 0;" onclick="open_review(2)">8 <img src="../static/assets/3stars_dark.png" style="vertical-align: middle;width:200px;height:38px;"></td><td style="text-align: center;border-top: 0;">100 Avenue, ON K8A 5B7</td></tr>
                </tbody>
                <tbody>
                    <tr onclick="opencarrier(3)"><td style="text-align: center;border-bottom: 0;">Amazon</td><td style="text-align: center;border-bottom: 0;">2.3 km</td><td rowspan="2" style="text-align: right"><img src="../static/assets/instore_pickup_light.png" style="vertical-align: middle;width:25px;height:25px;">$9.99</td></tr>
                    <tr><td style="text-align: center;border-top: 0;" onclick="open_review(3)">5 <img src="../static/assets/2stars_light.png" style="vertical-align: middle;width:200px;height:38px"></td><td style="text-align: center;border-top: 0;">143 Avenue, ON K1B 6F2</td></tr>
                </tbody>
                <tbody>
                    <tr onclick="opencarrier(1)"><td style="text-align: center;border-bottom: 0;">Canada Post Regular</td><td style="text-align: center;border-bottom: 0;">2 km</td><td rowspan="2" style="text-align: right"><img src="../static/assets/mag_glass_dark.png" style="vertical-align: middle;width:25px;height:25px;"><img src="../static/assets/instore_pickup_dark.png" style="vertical-align: middle;width:25px;height:25px;">$10.99</td></tr>
                    <tr><td style="text-align: center;border-top: 0;" onclick="open_review(1)">5 <img src="../static/assets/5stars_dark.png" style="vertical-align: middle;width:200px;height:38px"></td><td style="text-align: center;border-top: 0;">123 Street, ON J7F 9J6</td></tr>
                </tbody>
    </table>`;
var price_asc = `       <table id="tableheader" class="carrier-list" style="width:90%">
            <thead>
                <tr><th>
                    <div><img id="carrier_sort" src="../static/assets/carrier_asc.png" onmouseover="this.src='../static/assets/carrier_asc_hover.png'" onmouseout="this.src='../static/assets/carrier_asc.png'" onclick="sort(1)"></th><th id="branch"><img id="branch_sort" src="../static/assets/branch_asc.png" onmouseover="this.src='../static/assets/branch_asc_hover.png'" onmouseout="this.src='../static/assets/branch_asc.png'" onclick="sort(2)"></th><th id="price"><img id="price_sort" src="../static/assets/price_asc_on.png" onmouseover="this.src='../static/assets/price_asc_hover.png'" onmouseout="this.src='../static/assets/price_asc_on.png'" onclick="sort(3)"></th></tr>
            </thead>
                <tbody>
                    <tr onclick="opencarrier(2)"><td style="text-align: center;border-bottom: 0;">UPS Express</td><td style="text-align: center;border-bottom: 0;">3 km</td><td rowspan="2" style="text-align: right">$8.99</td></tr>
                    <tr><td style="text-align: center;border-top: 0;" onclick="open_review(2)">8 <img src="../static/assets/3stars_dark.png" style="vertical-align: middle;width:200px;height:38px;"></td><td style="text-align: center;border-top: 0;">100 Avenue, ON K8A 5B7</td></tr>
                </tbody>
                <tbody>
                    <tr onclick="opencarrier(3)"><td style="text-align: center;border-bottom: 0;">Amazon</td><td style="text-align: center;border-bottom: 0;">2.3 km</td><td rowspan="2" style="text-align: right"><img src="../static/assets/instore_pickup_light.png" style="vertical-align: middle;width:25px;height:25px;">$9.99</td></tr>
                    <tr><td style="text-align: center;border-top: 0;" onclick="open_review(3)">5 <img src="../static/assets/2stars_light.png" style="vertical-align: middle;width:200px;height:38px"></td><td style="text-align: center;border-top: 0;">143 Avenue, ON K1B 6F2</td></tr>
                </tbody>
                <tbody>
                    <tr onclick="opencarrier(1)"><td style="text-align: center;border-bottom: 0;">Canada Post Regular</td><td style="text-align: center;border-bottom: 0;">2 km</td><td rowspan="2" style="text-align: right"><img src="../static/assets/mag_glass_dark.png" style="vertical-align: middle;width:25px;height:25px;"><img src="../static/assets/instore_pickup_dark.png" style="vertical-align: middle;width:25px;height:25px;">$10.99</td></tr>
                    <tr><td style="text-align: center;border-top: 0;" onclick="open_review(1)">5 <img src="../static/assets/5stars_dark.png" style="vertical-align: middle;width:200px;height:38px"></td><td style="text-align: center;border-top: 0;">123 Street, ON J7F 9J6</td></tr>
                </tbody>
                <tbody>
                    <tr onclick="opencarrier(2)"><td style="text-align: center;border-bottom: 0;">UPS Premium</td><td style="text-align: center;border-bottom: 0;">3 km</td><td style="text-align: right;border-bottom: 0;color: #FFBBBB">$15.99</td></tr>
                    <tr><td style="text-align: center;border-top: 0;" onclick="open_review(4)">9 <img src="../static/assets/3stars_light.png" style="vertical-align: middle;width:200px;height:38px"></td><td style="text-align: center;border-top: 0;">100 Avenue, ON K8A 5B7</td><td style="text-align: right;border-top: 0;color: #FFBBBB" onclick="openModal(1)">Promotion Available</td></tr>
                </tbody>
                <tbody>
                    <tr onclick="opencarrier(4)"><td style="text-align: center;border-bottom: 0;">Purolator</td><td style="text-align: center;border-bottom: 0;">5 km</td><td style="text-align: right;border-bottom: 0;color: #FFBBBB"><img src="../static/assets/mag_glass_red_dark.png" style="vertical-align: middle;width:25px;height:25px;">$17.99</td></tr>
                    <tr><td style="text-align: center;border-top: 0;" onclick="open_review(5)">7 <img src="../static/assets/4stars_dark.png" style="vertical-align: middle;width:200px;height:38px"></td><td style="text-align: center;border-top: 0;">49 Avenue, ON K2A 3C6</td><td style="text-align: right;border-top: 0;color: #FFBBBB" onclick="openModal(2)">Promotion Available</td></tr>
                </tbody>
    </table>`;
var price_desc = `      <table id="tableheader" class="carrier-list" style="width:90%">
            <thead>
                <tr><th>
                    <div><img id="carrier_sort" src="../static/assets/carrier_asc.png" onmouseover="this.src='../static/assets/carrier_asc_hover.png'" onmouseout="this.src='../static/assets/carrier_asc.png'" onclick="sort(1)"></th><th id="branch"><img id="branch_sort" src="../static/assets/branch_asc.png" onmouseover="this.src='../static/assets/branch_asc_hover.png'" onmouseout="this.src='../static/assets/branch_asc.png'" onclick="sort(2)"></th><th id="price"><img id="price_sort" src="../static/assets/price_desc_on.png" onmouseover="this.src='../static/assets/price_desc_hover.png'" onmouseout="this.src='../static/assets/price_desc_on.png'" onclick="sort(3)"></th></tr>
            </thead>            
                <tbody>
                    <tr onclick="opencarrier(4)"><td style="text-align: center;border-bottom: 0;">Purolator</td><td style="text-align: center;border-bottom: 0;">5 km</td><td style="text-align: right;border-bottom: 0;color: #FFBBBB"><img src="../static/assets/mag_glass_red_dark.png" style="vertical-align: middle;width:25px;height:25px;">$17.99</td></tr>
                    <tr><td style="text-align: center;border-top: 0;" onclick="open_review(5)">7 <img src="../static/assets/4stars_dark.png" style="vertical-align: middle;width:200px;height:38px"></td><td style="text-align: center;border-top: 0;">49 Avenue, ON K2A 3C6</td><td style="text-align: right;border-top: 0;color: #FFBBBB" onclick="openModal(2)">Promotion Available</td></tr>
                </tbody>
                <tbody>
                    <tr onclick="opencarrier(2)"><td style="text-align: center;border-bottom: 0;">UPS Premium</td><td style="text-align: center;border-bottom: 0;">3 km</td><td style="text-align: right;border-bottom: 0;color: #FFBBBB">$15.99</td></tr>
                    <tr><td style="text-align: center;border-top: 0;" onclick="open_review(4)">9 <img src="../static/assets/3stars_light.png" style="vertical-align: middle;width:200px;height:38px"></td><td style="text-align: center;border-top: 0;">100 Avenue, ON K8A 5B7</td><td style="text-align: right;border-top: 0;color: #FFBBBB" onclick="openModal(1)">Promotion Available</td></tr>
                </tbody>
                <tbody>
                    <tr onclick="opencarrier(1)"><td style="text-align: center;border-bottom: 0;">Canada Post Regular</td><td style="text-align: center;border-bottom: 0;">2 km</td><td rowspan="2" style="text-align: right"><img src="../static/assets/mag_glass_dark.png" style="vertical-align: middle;width:25px;height:25px;"><img src="../static/assets/instore_pickup_dark.png" style="vertical-align: middle;width:25px;height:25px;">$10.99</td></tr>
                    <tr><td style="text-align: center;border-top: 0;" onclick="open_review(1)">5 <img src="../static/assets/5stars_dark.png" style="vertical-align: middle;width:200px;height:38px"></td><td style="text-align: center;border-top: 0;">123 Street, ON J7F 9J6</td></tr>
                </tbody>
                <tbody>
                    <tr onclick="opencarrier(3)"><td style="text-align: center;border-bottom: 0;">Amazon</td><td style="text-align: center;border-bottom: 0;">2.3 km</td><td rowspan="2" style="text-align: right"><img src="../static/assets/instore_pickup_light.png" style="vertical-align: middle;width:25px;height:25px;">$9.99</td></tr>
                    <tr><td style="text-align: center;border-top: 0;" onclick="open_review(3)">5 <img src="../static/assets/2stars_light.png" style="vertical-align: middle;width:200px;height:38px"></td><td style="text-align: center;border-top: 0;">143 Avenue, ON K1B 6F2</td></tr>
                </tbody>
                <tbody>
                    <tr onclick="opencarrier(2)"><td style="text-align: center;border-bottom: 0;">UPS Express</td><td style="text-align: center;border-bottom: 0;">3 km</td><td rowspan="2" style="text-align: right">$8.99</td></tr>
                    <tr><td style="text-align: center;border-top: 0;" onclick="open_review(2)">8 <img src="../static/assets/3stars_dark.png" style="vertical-align: middle;width:200px;height:38px;"></td><td style="text-align: center;border-top: 0;">100 Avenue, ON K8A 5B7</td></tr>
                </tbody>
    </table>`;

var home_sort = `     <table id="tableheader" class="carrier-list" style="width:90%">
            <thead>
                <tr><th>
                    <div><img id="carrier_sort" src="../static/assets/carrier_asc.png" onmouseover="this.src='../static/assets/carrier_asc_hover.png'" onmouseout="this.src='../static/assets/carrier_asc.png'" onclick="sort(1)"></th><th id="branch"><img id="branch_sort" src="../static/assets/branch_asc.png" onmouseover="this.src='../static/assets/branch_asc_hover.png'" onmouseout="this.src='../static/assets/branch_asc.png'" onclick="sort(2)"></th><th id="price"><img id="price_sort" src="../static/assets/price_asc.png" onmouseover="this.src='../static/assets/price_asc_hover.png'" onmouseout="this.src='../static/assets/price_asc.png'" onclick="sort(3)"></th></tr>
            </thead>
                <tbody>
                    <tr onclick="opencarrier(2)"><td style="text-align: center;border-bottom: 0;">UPS Express</td><td style="text-align: center;border-bottom: 0;">3 km</td><td rowspan="2" style="text-align: right">$8.99</td></tr>
                    <tr><td style="text-align: center;border-top: 0;" onclick="open_review(2)">8 <img src="../static/assets/3stars_dark.png" style="vertical-align: middle;width:200px;height:38px;"></td><td style="text-align: center;border-top: 0;">100 Avenue, ON K8A 5B7</td></tr>
                </tbody>
                <tbody>
                    <tr onclick="opencarrier(3)"><td style="text-align: center;border-bottom: 0;">Amazon</td><td style="text-align: center;border-bottom: 0;">2.3 km</td><td rowspan="2" style="text-align: right"><img src="../static/assets/instore_pickup_light.png" style="vertical-align: middle;width:25px;height:25px;">$9.99</td></tr>
                    <tr><td style="text-align: center;border-top: 0;" onclick="open_review(3)">5 <img src="../static/assets/2stars_light.png" style="vertical-align: middle;width:200px;height:38px"></td><td style="text-align: center;border-top: 0;">143 Avenue, ON K1B 6F2</td></tr>
                </tbody>
                <tbody>
                    <tr onclick="opencarrier(1)"><td style="text-align: center;border-bottom: 0;">Canada Post Regular</td><td style="text-align: center;border-bottom: 0;">2 km</td><td rowspan="2" style="text-align: right"><img src="../static/assets/mag_glass_dark.png" style="vertical-align: middle;width:25px;height:25px;"><img src="../static/assets/instore_pickup_dark.png" style="vertical-align: middle;width:25px;height:25px;">$10.99</td></tr>
                    <tr><td style="text-align: center;border-top: 0;" onclick="open_review(1)">5 <img src="../static/assets/5stars_dark.png" style="vertical-align: middle;width:200px;height:38px"></td><td style="text-align: center;border-top: 0;">123 Street, ON J7F 9J6</td></tr>
                </tbody>
                <tbody>
                    <tr onclick="opencarrier(2)"><td style="text-align: center;border-bottom: 0;">UPS Premium</td><td style="text-align: center;border-bottom: 0;">3 km</td><td style="text-align: right;border-bottom: 0;color: #FFBBBB">$15.99</td></tr>
                    <tr><td style="text-align: center;border-top: 0;" onclick="open_review(4)">9 <img src="../static/assets/3stars_light.png" style="vertical-align: middle;width:200px;height:38px"></td><td style="text-align: center;border-top: 0;">100 Avenue, ON K8A 5B7</td><td style="text-align: right;border-top: 0;color: #FFBBBB" onclick="openModal(1)">Promotion Available</td></tr>
                </tbody>
                <tbody>
                    <tr onclick="opencarrier(4)"><td style="text-align: center;border-bottom: 0;">Purolator</td><td style="text-align: center;border-bottom: 0;">5 km</td><td style="text-align: right;border-bottom: 0;color: #FFBBBB"><img src="../static/assets/mag_glass_red_dark.png" style="vertical-align: middle;width:25px;height:25px;">$17.99</td></tr>
                    <tr><td style="text-align: center;border-top: 0;" onclick="open_review(5)">7 <img src="../static/assets/4stars_dark.png" style="vertical-align: middle;width:200px;height:38px"></td><td style="text-align: center;border-top: 0;">49 Avenue, ON K2A 3C6</td><td style="text-align: right;border-top: 0;color: #FFBBBB" onclick="openModal(2)">Promotion Available</td></tr>
                </tbody>
    </table>`;

function size_per(num){
    var select = document.getElementsByClassName('img-btn')

    if (num === 0){
        select[0].style.backgroundColor = "#63411F";
        select[1].style.backgroundColor = "#B58F68";
        select[2].style.backgroundColor = "#B58F68";
        
    }
    else if (num === 1){
        select[0].style.backgroundColor = "#B58F68";
        select[1].style.backgroundColor = "#63411F";
        select[2].style.backgroundColor = "#B58F68";
        
    }
    else{
        select[0].style.backgroundColor = "#B58F68";
        select[1].style.backgroundColor = "#B58F68";
        select[2].style.backgroundColor = "#63411F";
    }
}

function custom(){
    window.location.href = './package_details_bus_per.html'
}

function end(){
    window.location.href = './Carrier_select.html'
}

function back_cart(){
    var type = window.sessionStorage.getItem("personalOrBus");
    if (type == "personal")
    window.location.href = './fragile.html'
else
    window.location.href = './track_fragile.html'

}

function openModal(num) {
    var modal = document.getElementById("promoModal" + num);
    modal.style.display = "block";
}

function closeModal(num) {
    var modal = document.getElementById("promoModal" + num);
    modal.style.display = "none";
}

function open_review(num) {
    if (num === 1) {
        window.open("./ReviewPage_cp.html");
    }
    if (num === 2) {
        window.open("./ReviewPage_ups.html");        
    }
    if (num === 3) {
        window.open("./ReviewPage_am.html");
    }
    if (num === 4) {
        window.open("./ReviewPage_upsp.html");
    }
    if (num === 5) {
        window.open("./ReviewPage_puro.html");
    }
}

function back_carrier() {
    window.close();
}

window.onclick = function(event) {
    var modal1 = document.getElementById("promoModal1");
    var modal2 = document.getElementById("promoModal2");  
    if (event.target == modal1) {
        modal1.style.display = "none";
    }
    if (event.target == modal2) {
        modal2.style.display = "none";
    }
}