var $datetimeInput = document.querySelector("#datetime-input");
var $cityInput = document.querySelector("#city-input");
var $stateInput = document.querySelector("#state-input")
var $countryInput = document.querySelector("#country-input");
var $shapeInput = document.querySelector("#shape-input");
var $commentInput = document.querySelector("#comment-input");

var $searchBtn = document.querySelector("#search");
var $resetBtn = document.querySelector("#reset");

var $tbody = document.querySelector("tbody");

// When the submit button is clicked, call the handleSubmitClick function
$searchBtn.addEventListener("click", handleSearchClick);
$resetBtn.addEventListener("click", handleResetClick);

allData = dataSet;
displayData = allData;

function isValidDate(dateString)
{
    // First check for the pattern
    console.log(dateString);
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
        //return false;
        return '01/01/1700';

    // Parse the date parts to integers
    var parts = dateString.split("/");
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month == 0 || month > 12)
        //return false;
        return '01/01/1700';

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    //return day > 0 && day <= monthLength[month - 1];
    if(day > 0 && day <= monthLength[month - 1])
    {
        return dateString;
    }
};

function handleSearchClick()
{
    console.log("Yay!! Search");
    var datetime_t_val = $datetimeInput.value.trim();
    if(isValidDate(datetime_t_val)) datetime_filter = datetime_t_val;
    var city_filter = $cityInput.value.toLowerCase().trim();
    var state_filter = $stateInput.value.trim().toLowerCase();
    var country_filter = $countryInput.value.trim().toLowerCase();
    var shape_filter  = $shapeInput.value.trim().toLowerCase();
    var comment_filter = $commentInput.value.trim().toLowerCase();

    // var filteredData1 = allData.filter((data) => {
    //     if (data.state === 'ar') {
    //         console.log('ARKANSAS');
    //     }
    // return data.state === "ar"
    //     })
    // console.log('FILTERED DATA:', filteredData1);

    var filteredData = allData.filter(function(data){
        var datetime_val = data.datetime;
        var city_val =  data.city.toLowerCase();
        var state_val =  data.state.toLowerCase();
        var country_val =  data.country.toLowerCase();
        var shape_val  =  data.shape.toLowerCase();
        var comment_val =  data.comments.toLowerCase();
        console.log('val : ' + city_val);
        console.log('filter : ' + city_filter);
        if ( city_val == city_filter
            // (datetime_val === datetime_filter || datetime_val ==='') &&
//             (city_val === city_filter || city_val ==='') &&
//             (state_val === state_filter || state_val==='') &&
//             (country_val === country_filter || country_val==='') &&
//             (shape_val === shape_filter || shape_val==='')  &&
//             (comment_val === comment_filter || comment_val==='')
           )
        {
                console.log(datetime_val);
                console.log(city_val);
                console.log(state_val);
                console.log(country_val);
                console.log(shape_filter);
                console.log(comment_filter);
                return true;
        }
        else 
        {
        console.log('did not match');
        console.log(city_filter);
        console.log(city_val);
        return false;
        }
    });

    displayData = filteredData;
    renderTable();

};





function handleResetClick()
{

    $tbody.innerHTML = "";
    consoloe.log('confused??');
}




function renderTable() 
{
    console.log('i am rendering the table now');
    console.log(displayData)
    $tbody.innerHTML = "";
    for (var i=0;i<displayData.length;i++)
    {
        var rowData = displayData[i];
        var rowKeys = Object.keys(rowData);
        var $row = $tbody.insertRow(i);
        for (var j=0; j<rowKeys.length;j++)
        {
            var cellInput = rowKeys[j]
            var $cell = $row.insertCell(j);
            $cell.innerText = rowData[cellInput]
        }
    }
}
// Render the table for the first time on page load
//console.log('frustrated print');
renderTable();