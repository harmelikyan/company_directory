//Preloader
$(window).on('load', function () {
    if ($('#preloader').length) {
    $('#preloader').delay(100).fadeOut('slow', function () {
    $(this).remove();
            });
        }
    });
    
//get all results to the page:
function getAllData(queryFilter, sortBy) {
    var first = queryPrepare(queryFilter)[0];
    var last = queryPrepare(queryFilter)[1];
    $.ajax({
        url: './php/getAll.php',
        type: 'POST',
        datatype: 'json',
        data: {
            firstName: first,
            lastName: last,
            sortBy: sortBy
        },
        success: function(result) {
            showResult(result.data);
            //console.log(result);
            
        },
        error: function(error) {
            console.log(error);
        }
    });
}
//list of employees
function showResult(data) {
    $('#personnelList').html('');

    data.forEach(employee => {
        
        let elementHTML = `
        <div class="col col-12 col-sm-6 col-md-4 col-xl-3 cardDiv" id="personnelCardDiv">
            <div id='employee${employee.id}' class="card mb-3 mx-2 personnelCard" style="background-color: #2E4C6D; color: #DADDFC">
                <div class="card-header card-title h5">
                    <span class="d-block" id='firstName${employee.id}'>${employee.firstName}</span> <span id='lastName${employee.id}' style="background-color:#2E4C6D">${employee.lastName}</span>

                    <button id="deleteEmployeeBtn${employee.id}" class="btn btn-sm delete" data-toggle="modal" data-target="#deleteEmployeeModal"><span id="delete${employee.id}" class="material-icons">delete</span></button>
                    <button id="editEmployeeBtn${employee.id}" class="btn btn-sm edit" data-toggle="modal" data-target="#editEmployeeModal"><span id="edit${employee.id}" class="material-icons">edit</span></button> 
                </div>
                <div id="personnelCardBody" class="card-body text-dark" style="">
                    <p class="d-none" id='employeeId${employee.id}'>${employee.id}</p>
                    <p class="d-none" id='employeeDepId${employee.id}'>${employee.departmentId}</p>
                    <span id='employeeJobTitle${employee.id}'>${employee.jobTitle}</span></p>
                    <p><span class="material-icons personnelCardIcon mx-1">groups</span>
                    <span id='employeeDepartment${employee.id}' style="color: #2E4C6D; font-size: 23px;">${employee.department}</span></p>
                    <p><span class="material-icons personnelCardIcon mx-1">location_on</span>
                    <span id='employeeLocation${employee.id}' style="color: #2E4C6D; font-size: 23px;">${employee.location}</span></p>
                    <p><span class="material-icons personnelCardIcon mx-1">alternate_email</span> 
                    <span id='employeeEmail${employee.id}' style="color: #2E4C6D; font-size: 23px;">${employee.email}</span></p>
                </div>
            </div>
        </div>
            `;

        $('#personnelList')[0].insertAdjacentHTML('beforeend', elementHTML);
        
        //adding event listener to each employee edit btn element:
        $(`#editEmployeeBtn${employee.id}`).on('click', function() {
            updateEditEmployeeModal(employee);
            populateDepartmentSelect($('#editEmployeeDepartmentSelect'));
            $('#editEmployeeInputError').hide();
            setTimeout(function() {
                $('#editEmployeeDepartmentSelect').val(employeeDepartmentId);
            }, 300); 
        });

        //adding event listener to each employee delete btn element:
        $(`#deleteEmployeeBtn${employee.id}`).on('click', function() {
            updateDeleteEmployeeModal(employee);
        });

        addBoldToSortedOption($('#sortSelect').val(), employee);
    });
}

function addBoldToSortedOption(sortedBy, employee) {
    switch(sortedBy) {
        case 'firstName':
            $(`#firstName${employee.id}`).css('font-weight', 'bold');
            $(`#lastName${employee.id}`).css('font-weight', 'normal');
            $(`#employeeDepartment${employee.id}`).css('font-weight', 'normal');
            $(`#employeeLocation${employee.id}`).css('font-weight', 'normal');
            break;
        case 'lastName':
            $(`#firstName${employee.id}`).css('font-weight', 'normal');
            $(`#lastName${employee.id}`).css('font-weight', 'bold');
            $(`#employeeDepartment${employee.id}`).css('font-weight', 'normal');
            $(`#employeeLocation${employee.id}`).css('font-weight', 'normal');
            break;
        case 'department':
            $(`#firstName${employee.id}`).css('font-weight', 'normal');
            $(`#lastName${employee.id}`).css('font-weight', 'normal');
            $(`#employeeDepartment${employee.id}`).css('font-weight', 'bold');
            $(`#employeeLocation${employee.id}`).css('font-weight', 'normal');
            break;
         case 'location':
            $(`#firstName${employee.id}`).css('font-weight', 'normal');
            $(`#lastName${employee.id}`).css('font-weight', 'normal');
            $(`#employeeDepartment${employee.id}`).css('font-weight', 'normal');
            $(`#employeeLocation${employee.id}`).css('font-weight', 'bold');
            break;
        default:
            break;
    }
}

//declaring variable that will store the current selected employee department id to update the select element of the required modals:
var employeeDepartmentId;
//function to update the result data when list element is clicked:
function updateEditEmployeeModal(employee) {
     $('#editEmployeeId').html(employee.id);
     $('#editEmployeeFirstNameInput').val(`${employee.firstName}`);
     $('#editEmployeeLastNameInput').val(`${employee.lastName}`);
     $('#editEmployeePositionInput').val(employee.jobTitle);
     $('#editEmployeeEmailInput').val(employee.email);
     employeeDepartmentId = employee.departmentId;
}

function updateDeleteEmployeeModal(employee) {
     $('#modalEmployeeName').html(`${employee.firstName} ${employee.lastName}`);
     $('#modalEmployeeId').html(employee.id);
}


//calling getAllData with no arguments for query to get eveything on page on load:
getAllData('', $('#sortSelect').val());

//LOGIC TO FILL THE DEPARTMENT LIST:
function populateDepartmentList(queryFilter) {
    var search = queryPrepareDeptLoc(queryFilter);
    $.ajax({
        url: './php/getAllDepartments.php',
        type: 'POST',
        datatype: 'json',
        data: {search: search},
        success: function(result) {
            //console.log(result);
            departmentListUpdate(result.data);
        },
        error: function(error) {
            console.log(error);
        }
    });
}

//list of departments:
function departmentListUpdate(data) {
    $('#departmentList').html('');

    data.forEach(department => {
        
        let elementHTML = `
        <div class="col col-12 col-sm-6 col-md-4 col-xl-3 cardDiv" id="departmentCardDiv">
            <div id='department${department.id}' class="card mb-3 mx-2 departmentCard" style="background-color: #2E4C6D; color: #DADDFC ">
                <div class="card-header card-title h5">
                    <p class="d=block departmentName" id='departmentName${department.id}'>${department.name}</p>
                    <button id="deleteDepartmentBtn${department.id}" class="btn btn-sm delete"><span id="deleteDepartment${department.id}" class="material-icons">delete</span></button>
                    <button id="editDepartmentBtn${department.id}" class="btn btn-sm edit" data-toggle="modal" data-target="#editDepartmentModal"><span id="editDepartment${department.id}" class="material-icons">edit</span></button> 
                </div>
                <div id="departmentCardBody" class="card-body" style="color: #2E4C6D; font-size: 23px;">
                    <p id="departmentId${department.id}" class="d-none">${department.id}</p>
                    <p><span class="material-icons departmentCardIcon mx-1">location_on</span>
                    <span id="departmentLocation${department.id}">${department.location}</span></p>
                    <p><span class="material-icons departmentCardIcon mx-1">groups</span>
                    <span id="departmentTotalPersonnel${department.id}"></span></p>
                </div>
            </div>
        </div>
            `;
        getPersonnelByDepartment(department.id);    
        $('#departmentList')[0].insertAdjacentHTML('beforeend', elementHTML);
        
        //adding event listener to department edit modal:
        $(`#editDepartmentBtn${department.id}`).on('click', function() {
            updateEditDepartmentModal(department);
            populateLocationSelect($('#editDepartmentLocationSelect'));
            setTimeout(function() {
                getDepartmentById(department.id);
            }, 300);
        });

        //adding event listener to department delete modal:
        $(`#deleteDepartmentBtn${department.id}`).on('click', function() {
            if ($(`#departmentTotalPersonnel${department.id}`).html() > 0) {
                $('#noDeleteDepartmentModal').modal();
            } else {
                updateDeleteDepartmentModal(department);
                $('#deleteDepartmentModal').modal();
            }
        });
    });
}

function updateEditDepartmentModal(department) {
    $('#editDepartmentName').html(department.name);
    $('#editDepartmentNameInput').val(department.name);
    $('#editDepartmentId').html(department.id);
}


function updateDeleteDepartmentModal(department) {
    $('#deleteDepartmentName').html(department.name);
    $('#deleteDepartmentId').html(department.id);
}

//function to get all employees of a department:
function getPersonnelByDepartment(departmentId) {
    $.ajax({
        url: './php/getPersonnelByDepartment.php',
        type: 'POST',
        datatype: 'json',
        data: {
            departmentId: departmentId
        },
        success: function(result) {
            //console.log(result);
            $(`#departmentTotalPersonnel${departmentId}`).html(result.data.length);
        },
        error: function(error) {
            console.log(error);
        }
    });
}

populateDepartmentList('');

//LOGIC TO FILL THE Location LIST:
function populateLocationList(queryFilter) {
    var search = queryPrepareDeptLoc(queryFilter);
    $.ajax({
        url: './php/getAllLocations.php',
        type: 'POST',
        datatype: 'json',
        data: {search: search},
        success: function(result) {
            //console.log(result);
            locationListUpdate(result.data);
        },
        error: function(error) {
            console.log(error);
        }
    });
}
//list of locations
function locationListUpdate(data) {
    $('#locationList').html('');

    data.forEach(location => {
        
        let elementHTML = `
                    <div class="col col-12 col-sm-6 col-md-4 col-xl-3 cardDiv" id="locationCardDiv">
                        <div id='location${location.id}' class="card mb-3 mx-2 locationCard" style="color: #DADDFC; background-color: #2E4C6D">
                            <div class="card-header card-title h5">
                                <p class="d-block locationName" id='locationName${location.id}'>${location.name}</p>
                                <button id="deleteLocationBtn${location.id}" class="btn btn-sm delete"><span id="deleteLocation${location.id}" class="material-icons">delete</span></button> 
                                <button id="editLocationBtn${location.id}" class="btn btn-sm edit" data-toggle="modal" data-target="#editLocationModal"><span id="editLocation${location.id}" class="material-icons">edit</span></button>
                            </div>
                            <div id="locationCardBody" class="card-body text-white">
                                <p id="locationId${location.id}" class="d-none">${location.id}</p>
                                <p><span class="material-icons locationCardIcon mx-1">groups_on</span>
                                <span id="locationTotalDepartments${location.id}" style="color: #2E4C6D; font-size: 23px; margin-left: -70px;"></span></p>
                                <p><span class="material-icons locationCardIcon mx-1">location_on</span>
                                <span id="locationTotalPersonnel${location.id}" style="color: #2E4C6D; font-size: 23px;"></span></p>
                            </div>
                        </div>
                    </div>
            `;
        getDepartmentsByLocation(location.id);
        getPersonnelByLocation(location.id);

        $('#locationList')[0].insertAdjacentHTML('beforeend', elementHTML);

        ///adding event listener to each location edit btn:
        $(`#editLocationBtn${location.id}`).on('click', function() {
            updateEditLocationModal(location);
        });
        
        //adding event listener to each location delete btn:
        $(`#deleteLocationBtn${location.id}`).on('click', function() {
            if ($(`#locationTotalDepartments${location.id}`).html() == '') {
                updateDeleteLocationModal(location)
                $('#deleteLocationModal').modal();
            } else {
                $('#noDeleteLocationModal').modal();
            }
        });

    });
}

function updateDeleteLocationModal(location) {
    $('#deleteLocationName').html(location.name);
    $('#deleteLocationId').html(location.id);
}

function updateEditLocationModal(location) {
    $('#editLocationName').html(location.name);
    $('#editLocationNameInput').val(location.name);
    $('#editLocationId').html(location.id);
}

function getDepartmentsByLocation(locationId) {
    $.ajax({
        url: './php/getDepartmentsByLocation.php',
        type: 'POST',
        datatype: 'json',
        data: {
            locationId: locationId
        },
        success: function(result) {
            //console.log(result);
            $(`#locationTotalDepartments${locationId}`).html('');
            result.data.forEach(department => {
                $(`#locationTotalDepartments${locationId}`)[0].insertAdjacentHTML('beforeend', `${department.name}, `)  
            })
        },
        error: function(error) {
            console.log(error);
        }
    });
}

function getPersonnelByLocation(locationId) {
    $.ajax({
        url: './php/getPersonnelByLocation.php',
        type: 'POST',
        datatype: 'json',
        data: {
            locationId: locationId
        },
        success: function(result) {
            //console.log(result);
            $(`#locationTotalPersonnel${locationId}`).html(result.data.length);
        },
        error: function(error) {
            console.log(error);
        }
    });
}

populateLocationList('');

//searchbar event listener:
var selectedTable = 'personnel';//global variable that will indicate the selected table that will be searched by the searchbar (personnel as default on load);
var delay;
$('#searchBar').on('input', function() {
    var searchBarInput = $('#searchBar').val();

    clearTimeout(delay);//this line stop querys to queue up as the user type

    switch(selectedTable) {
        case 'personnel':
            delay = setTimeout(function() {
                getAllData(searchBarInput, $('#sortSelect').val())
            }, 300);
            break;

        case 'department':
            delay = setTimeout(function() {
                populateDepartmentList(searchBarInput)
            }, 300);
            break;

        case 'location':
             delay = setTimeout(function() {
                 populateLocationList(searchBarInput)
                }, 300);
            break;

        default:
            break;
    }  
});


//sortSelect event listener:
$('#sortSelect').on('change', function() {
    getAllData($('#searchBar').val(), $('#sortSelect').val());
});

//personnelListListbtn event listener:
$('#personnelListBtn').on('click', function() {
    $('#personnelList').slideDown();
    $('#locationList').hide();
    $('#departmentList').hide();
    $('#sortSelect').show();
    selectedTable = 'personnel';
    getAllData('', $('#sortSelect').val());
});

//departmentListbtn event listener:
$('#departmentListBtn').on('click', function() {
    $('#personnelList').hide();
    $('#locationList').hide();
    $('#departmentList').slideDown();
    $('#sortSelect').hide();
    selectedTable = 'department';
    populateDepartmentList('');
});

//locationListBtn  event listener:
$('#locationListBtn').on('click', function() {
    $('#personnelList').hide();
    $('#departmentList').hide();
    $('#locationList').slideDown();
    $('#sortSelect').hide();
    selectedTable = 'location';
    populateLocationList('');
});

//addBtn event listener:
$('#addBtn').on('click', function() {
    slideUpBtnChoices([$('#moreOptionsBtnChoice')]);
});

//ADD NEW LOCATION LOGIC
//addLocationBtn event listener:
$('#addLocationBtn').on('click', function() {
    $('#locationInputError').hide();
});

//saveLocationBtn event listener:
$('#saveLocationForm').on('submit', function(e) {
    e.preventDefault();
    getAllLocations();
    var newLocation = $('#locationInput').val();
    setTimeout(function() {
        if (isLocationValid(newLocation)) {
            insertNewLocation(capitalizeString(newLocation));
        }
    }, 300);

});

//declaring global array that will store the locations and their ids:
var locationsArray = [];
var locationsIdarray = [];
//function to get all locations:
function getAllLocations() {
    locationsArray = [];
    locationsIdarray = [];
    $.ajax({
        url: './php/getAllLocations.php',
        type: 'POST',
        datatype: 'json',
        data: {search: ''},
        success: function(result) {
            //console.log(result);
            result.data.forEach(element => {
                locationsArray.push(element.name.toLowerCase());
                locationsIdarray.push(element.id);
            });
        },
        error: function(error) {
            console.log(error);
        }
    })
}

//isLocationValid function will test if the location is really new:
function isLocationValid(newLocation) {
   if (newLocation == '' || locationsArray.includes(newLocation.toLowerCase())) {
        $('#locationInputError').show();
        return false;
   } else {
        $('#locationInputError').hide();
        return true;
   }
}

//insertNewLocation function to add a new location to the database:
function insertNewLocation(newLocation) {
    $.ajax({
        url: './php/insertLocation.php',
        type: 'POST',
        datatype: 'json',
        data: {newLocation: newLocation},
        success: function(result) {
            $('#successfulModal').modal();
            $('#locationModal').modal('hide');
            populateLocationList(newLocation);  
            $('#personnelList').hide();
            $('#locationList').slideDown();
            $('#departmentList').hide();
        },
        error: function(error) {
            console.log(error);
        }
    });
}

//ADD NEW DEPARTMENT LOGIC
//addDepartmentBtn event listener:
$('#addDepartmentBtn').on('click', function() {
    $('#departmentInputError').hide();
    populateLocationSelect($('#departmentLocationSelect'));
});

//saveDepartmentBtn event listener:
$('#saveDepartmentForm').on('submit', function(e) {
    e.preventDefault();
    getAllDepartments();
    var newDepartment = $('#departmentInput').val();
    var locationId = $('#departmentLocationSelect').val();
    setTimeout(function () {
        if (isDepartmentValid(newDepartment)) {
            insertNewDepartment(capitalizeString(newDepartment), locationId);
        }
    }, 300);
});

//declaring global array that will store the departments and their ids:
var departmentsArray = [];
var departmentsIdarray = [];
//function to get all departments:
function getAllDepartments() {
    departmentsArray = [];
    departmentsIdArray = [];
    $.ajax({
        url: './php/getAllDepartments.php',
        type: 'POST',
        datatype: 'json',
        data: {search: ''},
        success: function(result) {
            //console.log(result);
            result.data.forEach(element => {
                departmentsArray.push(element.name.toLowerCase());
                departmentsIdArray.push(element.id);
            });
        },
        error: function(error) {
            console.log(error);
        }
    });
}

//isDepartmentValid will check if the department is new and is not falsy:
function isDepartmentValid(newDepartment) {
    if (newDepartment == '' || departmentsArray.includes(newDepartment.toLowerCase())) {
         $('#departmentInputError').show();
         $('#departmentInputSuccess').hide();
         return false;
    } else {
         $('#departmentInputSuccess').show();
         $('#departmentInputError').hide();
         return true;
    }
 }

 //insertNewDepartment function that will add new department to database:
 function insertNewDepartment(newDepartment, locationId) {
    $.ajax({
        url: './php/insertDepartment.php',
        type: 'POST',
        datatype: 'json',
        data: {
            newDepartment: newDepartment,
            locationId: locationId
        },
        success: function(result) {
            $('#successfulModal').modal();
            $('#departmentModal').modal('hide');
            populateDepartmentList(newDepartment);
            $('#personnelList').hide();
            $('#locationList').hide();
            $('#departmentList').slideDown();
        },
        error: function(error) {
            console.log(error);
        }
    });
 }

 //ADD NEW EMPLOYEE LOGIC
//addEmployeeBtn event listener:
$('#addEmployeeBtn').on('click', function() {
    $('#employeeInputError').hide();
    populateDepartmentSelect($('#employeeDepartmentSelect'));
});

//saveEmployeeBtn event listener:
$('#saveEmployeeForm').on('submit', function(e) {
    e.preventDefault();
    var firstName = $('#employeeFirstNameInput').val();
    var lastName = $('#employeeLastNameInput').val();
    var jobTitle = $('#employeePositionInput').val();
    var email = $('#employeeEmailInput').val();
    var departmentId = $('#employeeDepartmentSelect').val();
    if (isEmployeeValid(firstName, lastName, $('#employeeInputError'), $('#employeeInputSuccess'))) {
        insertNewEmployee(capitalizeString(firstName), capitalizeString(lastName), capitalizeString(jobTitle), email, departmentId);
    }
});

//isEmployeeValid function will check if the employee fields are ok:
function isEmployeeValid(firstName, lastName, employeeInputError, employeeInputSuccess) {
    if (firstName == '' || lastName == '') {
        employeeInputError.show();
        employeeInputSuccess.hide();
        return false;
    } else {
        employeeInputError.hide();
        employeeInputSuccess.show();
        return true;
    }
}

//insertEmployee function to add new employee to the database:
function insertNewEmployee(firstName, lastName, jobTitle, email, departmentId) {
    $.ajax({
        url: './php/insertEmployee.php',
        type: 'POST',
        datatype: 'json',
        data: {
            firstName: firstName,
            lastName: lastName,
            jobTitle: jobTitle,
            email: email,
            departmentId: departmentId
        },
        success: function(result) {
            $('#successfulModal').modal();
            $('#employeeModal').modal('hide');
            getAllData(`${firstName} ${lastName}`, $('#sortSelect').val());
            $('#personnelList').slideDown();
            $('#departmentList').hide();
            $('#locationList').hide();
        },
        error: function(error) {
            console.log(error);
        }
    });
 }

//DELETE EMPLOYEE LOGIC
//deleteEmployeeBtn event listener:
$('#deleteEmployeeBtn').on('click', function() {
    //console.log('clicked');
});

//confirmEmployeeDeleteBtn:
$('#deleteEmployeeForm').on('submit', function(e) {
    e.preventDefault();
    var employeeId = $('#modalEmployeeId').html();
    deleteEmployeeById(employeeId);
});

//deleteEmployeeById:
function deleteEmployeeById(employeeId) {
    $.ajax({
        url: './php/deleteEmployeeById.php',
        type: 'POST',
        datatype: 'json',
        data: {employeeId: employeeId},
        success: function(result) {
            getAllData($('#searchBar').val(), $('#sortSelect').val());
            $('#resultDataCol').slideUp();
            $('#resultCol').removeClass('mobileHide');
            $('#successfulModal').modal();
            $('#deleteEmployeeModal').modal('hide');
            slideUpBtnChoices([$('#moreOptionsBtnChoice')]);
        },
        error: function(error) {
            console.log(error);
        }
    });
}

//EDIT EMPLOYEE LOGIC
//confirmEmployeeEditBtn event listener:
$('#editEmployeeForm').on('submit', function(e) {
    e.preventDefault();
    var employeeId = $('#editEmployeeId').html();
    var firstName = $('#editEmployeeFirstNameInput').val();
    var lastName = $('#editEmployeeLastNameInput').val();
    var jobTitle = $('#editEmployeePositionInput').val();
    var email = $('#editEmployeeEmailInput').val();
    var departmentId = $('#editEmployeeDepartmentSelect').val();
    
    if (isEmployeeValid(firstName, lastName, $('#editEmployeeInputError'), $('#editEmployeeInputSuccess'))) {
        editEmployeeById(employeeId, capitalizeString(firstName), capitalizeString(lastName), capitalizeString(jobTitle), email, departmentId);
    }
});

//editEmployeeById function:
function editEmployeeById(employeeId, firstName, lastName, jobTitle, email, departmentId) {
    $.ajax({
        url: './php/editEmployeeById.php',
        type: 'POST',
        datatype: 'json',
        data: {
            employeeId: employeeId,
            firstName: firstName,
            lastName: lastName,
            jobTitle: jobTitle,
            email: email,
            departmentId: departmentId
        },
        success: function(result) {
            getAllData(`${firstName} ${lastName}`, $('#sortSelect').val());
            $('#successfulModal').modal();
            $('#editEmployeeModal').modal('hide');
            
        },
        error: function(error) {
            console.log(error);
        }
    });
}

//DELETE DEPARTMENT LOGIC:
//deleteDepartmentForm event listener:
$('#deleteDepartmentForm').on('submit', function(e) {
    e.preventDefault();
    deleteDepartmentById($('#deleteDepartmentId').html());
});
    

//deleteDepartmentById function:
function deleteDepartmentById(departmentId) {
    $.ajax({
        url: './php/deleteDepartmentById.php',
        type: 'POST',
        datatype: 'json',
        data: {departmentId: departmentId},
        success: function(result) {
            $('#deleteDepartmentModal').modal('hide');
            $('#successfulModal').modal();
            populateDepartmentList('');
        },
        error: function(error) {
            console.log(error);
        }
    });
}

//EDIT DEPARTMENT LOGIC:
//editDepartmentSelect evenetListener:
$('#editDepartmentSelect').on('change', function() {
    getDepartmentById($('#editDepartmentSelect').val());
    $('#editDepartmentNameInput').val($('#editDepartmentSelect option:selected').text());
});

//editDepartmentForm event listener:
$('#editDepartmentForm').on('submit', function(e) {
    e.preventDefault();
    var departmentId = $('#editDepartmentId').html();
    var locationId = $('#editDepartmentLocationSelect').val();
    var departmentName = $('#editDepartmentNameInput').val();
    
    editDepartmentById(departmentId, departmentName, locationId);
});

//editDepartmentById function:
function editDepartmentById(departmentId, departmentName, locationId) {
    
    $.ajax({
        url: './php/editDepartmentById.php',
        type: 'POST',
        datatype: 'json',
        data: {
            departmentId: departmentId,
            departmentName: departmentName,
            locationId: locationId
        },
        success: function(result) {
            $('#successfulModal').modal();
            $('#editDepartmentModal').modal('hide');
            populateDepartmentList(departmentName);
        },
        error: function(error) {
            console.log(error);
        }
    });
}

//EDIT LOCATION LOGIC:
$('#editLocationForm').on('submit', function(e) {
    e.preventDefault();
    var locationId = $('#editLocationId').html();
    var locationName = $('#editLocationNameInput').val();
    editLocationById(locationId, locationName);
});

function editLocationById(locationId, locationName) {
    
    $.ajax({
        url: './php/editLocationById.php',
        type: 'POST',
        datatype: 'json',
        data: {
            locationId: locationId,
            locationName: locationName
        },
        success: function(result) {
            $('#editLocationModal').modal('hide');
            $('#successfulModal').modal();
            populateLocationList(locationName);
        },
        error: function(error) {
            console.log(error);
        }
    });
}

//DELETE LOCATION LOGIC:

//deleteLocationForm event listener:
$('#deleteLocationForm').on('submit', function(e) {
    e.preventDefault();
    var locationId = $('#deleteLocationId').html();
    deleteLocationById(locationId);
});

//deleteLocationById function:
function deleteLocationById(locationId) {
    
    $.ajax({
        url: './php/deleteLocationById.php',
        type: 'POST',
        datatype: 'json',
        data: {locationId: locationId},
        success: function(result) {
            //console.log(result);
            $('#deleteLocationModal').modal('hide');
            $('#successfulModal').modal();
            populateLocationList('');
        },
        error: function(error) {
            console.log(error);
        }
    });
}










//UTILITY
//funtion to capitalize string:
function capitalizeString(str) {
    return str.trim().toLowerCase().replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
}

//populate location select element:
function populateLocationSelect(locationSelectElement) {
    getAllLocations();
    locationSelectElement.html(' ');
    setTimeout(function() {
        for (var i = 0; i < locationsIdarray.length; i++) {
            var optionHtml = `<option value="${locationsIdarray[i]}">${capitalizeString(locationsArray[i])}</option>`
            locationSelectElement[0].insertAdjacentHTML('beforeend', optionHtml);
        }
    }, 300);
}

//populate department select element:
function populateDepartmentSelect(departmentSelectElement, employeeDepartmentId) {
    getAllDepartments();
    departmentSelectElement.html(' ');
    setTimeout(function() {
        for (var i = 0; i < departmentsIdArray.length; i++) {
            var optionHtml = `<option value="${departmentsIdArray[i]}">${capitalizeString(departmentsArray[i])}</option>`
            departmentSelectElement[0].insertAdjacentHTML('beforeend', optionHtml);
        }
    }, 300);
}

//slideUp button choices:
function slideUpBtnChoices(btnChoiceList) {
    btnChoiceList.forEach(btnChoice => {
        btnChoice.slideUp();
    });
}

//getPersonnel function:
function getPersonnel(employeeId) {
    $.ajax({
        url: './php/getPersonnel.php',
        type: 'POST',
        datatype: 'json',
        data: {
            employeeId: employeeId,
        },
        success: function(result) {
            updateDataResult(result.data.personnel[0]);
            //console.log(result);
        },
        error: function(error) {
            console.log(error);
        }
    });
}

//getDepartmentById function:
function getDepartmentById(departmentId) {
    $.ajax({
        url: './php/getDepartmentById.php',
        type: 'POST',
        datatype: 'json',
        data: {
            departmentId: departmentId,
        },
        success: function(result) {
            //console.log(result);
            var department = result.data[0];
            $('#editDepartmentLocationSelect').val(department.locationId);
            $('#editDepartmentLocationSelect').change();
            $('#departmentCurrentlocation').html(department.location);
        },
        error: function(error) {
            console.log(error);
        }
    });
}

//function to prepare string from searchbar for personnel query:
function queryPrepare(queryStr) {
    let strArray = queryStr.trim().split(' ');
    var first = strArray[0];
    var last = strArray[strArray.length -1];
    return [first, last];
}

//function to prepare string from searchbar for location and department query:
function queryPrepareDeptLoc(queryStr) {
    var query = queryStr.trim();
    return query;
}



$('#filterBtn').click(function() {
    $('.bolorIcons').toggle();
})




