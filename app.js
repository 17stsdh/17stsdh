function filter() {
    var input, filter, listBox, listInner, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    listBox = document.getElementsByClassName("listBox")[0];
    listInner = listBox.getElementsByClassName("listInner");

    for (i = 0; i < listInner.length; i++) {
        txtValue = listInner[i].textContent || listInner[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            listInner[i].style.display = "";
        } else {
            listInner[i].style.display = "none";
        }
    }
}