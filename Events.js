/**
 * @author Amit Cohen , ID 315147330
 */
let x=0;
function load_Page(){
    parsData();
}
function current_date() {
    let x = new Date();
    return x.getDate() + "/" + (x.getMonth() + 1) + "/" + x.getFullYear();
}
function parsData(){
    data.sort(compare);
    for (let i=0;i<data.length;i++)
        creatEvent(data[i]);
}
function creatEvent(data) {
    let main_div = document.getElementById('events');
    /*create the new elements*/
    let element = document.createElement('div');
    let butt = document.createElement('button');
    let the_time = document.createElement('div');
    let the_date = document.createElement('div');
    let the_title = document.createElement('div');
    let the_description = document.createElement('div');
    let title_and_des = document.createElement('div');
    let date_and_time = document.createElement('div');
    let date_and_title = document.createElement('div');
    element.className = "newEvent";
    the_time.className = "the_time";
    the_date.className = "the_date";
    the_title.className = "the_title";
    the_description.className = "the_description";
    title_and_des.className = "title_and_des";
    date_and_time.className = "date_and_time";
    date_and_title.className = "date_and_title";
    the_description.innerHTML = data.description;
    the_time.innerHTML = data.time;
    if (data.date === current_date())
        the_date.innerHTML = "Today";
    else
        the_date.innerHTML = data.date;
    the_title.innerHTML = data.title;
    butt.innerHTML = "+ Add to calender";
    butt.id = "button_" + x;
    butt.onclick = function () {
        save_data(butt.id);
    };
    x++;
    title_and_des.appendChild(the_title);
    title_and_des.appendChild(the_description);
    date_and_time.appendChild(the_date);
    date_and_time.appendChild(the_time);
    date_and_title.appendChild(date_and_time);
    date_and_title.appendChild(title_and_des);
    element.appendChild(date_and_title);
    element.appendChild(butt);
    main_div.appendChild(element);
}
function compare(val1,val2) {
    let array1 = val1.date.split("/");
    let array2 = val2.date.split("/");
    if (array1[2] > array2[2])
        return 1;
    else if (array1[2] < array2[2])
        return -1;
    else if (array1[1] > array2[1])
        return 1;
    else if (array1[1] < array2[1])
        return -1;
    else if (array1[0] > array2[0])
        return 1;
    else if (array1[0] < array2[0])
        return -1;
    array1 = val1.time.split(":");
    array2 = val2.time.split(":");
    if (array1[0].length > array2[0].length)
        return 1;
    else if (array1[0].length < array2[0].length)
        return -1;
    else if (array1[0] > array2[0])
        return 1;
    else if (array1[0] < array2[0])
        return -1;
}
function save_data(id) {
    let a = id.split("_");
    if (!localStorage.getItem('Events')) {//check if the local-storage is't found
        localStorage.setItem('Events', JSON.stringify({}));
        let new_json = JSON.stringify(data[a[1]]);
        localStorage.setItem('Events', new_json);
    } else {
        let old_json = localStorage.getItem('Events');
        let old_string = JSON.parse(old_json);
        old_string[a[1]] = data[a[1]];
        localStorage.setItem('Events', JSON.stringify(old_string));
    }

}