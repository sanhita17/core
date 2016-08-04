$(document).ready(function () {


    //tgDPAccessReportSlideout
    $.getJSON("generatedComponents/JQXTreeGrid/sampleAccessReportSlideout.json", function (json) {
        $(".tgDPAccessReportSlideout").each(function () {
            // prepare the data
            var source =
                    {
                        dataType: "json",
                        dataFields: [
                            {name: "tName", type: "string"},
                            {name: "tViews", type: "string"},
                            {name: "tOrg", type: "string"},
                            {name: "tEmail", type: "string"},
                            {name: "tPhone", type: "string"},
                            {name: "tRole", type: "string"},
                            {name: "tAccess", type: "string"},
                            {name: "tActions", type: "string"},
                            {name: "tChildren", type: "array"}
                        ],
                        hierarchy:
                            {
                                root: "tChildren"
                            },
                        localData: json,
                        id: "tId"
                    };

            var dataAdapter = new $.jqx.dataAdapter(source);
            // create Tree Grid
            $(this).jqxTreeGrid({
                width: '100%',
//                height: 500,
                source: dataAdapter,
                width: 850,
                showHeader: true,
                theme: 'iltreegrid',
                columnsHeight: 35,
                columns: [
                    {text: 'Name', dataField: 'tName', width: '35%', pinned:true},
                    {text: 'Views', dataField: 'tViews',width: '15%'},
                    {text: 'Organization', dataField: 'tOrg',width: '35%'},
                    {text: 'Email', dataField: 'tEmail', width: '35%'},
                    {text: 'Phone', dataField: 'tPhone',width: '25%'},
                    {text: 'Type/Role', dataField: 'tRole',width: '15%'},
                    {text: 'Access', dataField: 'tAccess',width: '15%'},
                    {text: '<span class=\"ilicon ilicon-doc-hollow\"></span>', dataField: 'tActions', width: '5%'}
                    
                    
//                  { text: "Name", align: "center", dataField: "name", pinned: true, width: "34%" },
//                  { text: "Budget", cellsAlign: "center", align: "center", dataField: "budget", cellsFormat: "c2", width: "33%" },
//                  { text: "Location", dataField: "location", cellsAlign: "center", align: "center", width: "33%" }
                ]
            });
            $(this).jqxTreeGrid('expandAll');
        });
    });
    
    //dpSFChildRowSupData
    $.getJSON("generatedComponents/JQXTreeGrid/sampleSearchAndFilteringChildRowSupData.json", function (json) {
        $(".dpSFChildRowSupData").each(function () {
            // prepare the data
            var source =
                    {
                        dataType: "json",
                        dataFields: [
                            {name: 'tId', type: 'number'},
                            {name: 'tType', type: 'string'},
                            {name: 'tNum', type: 'string'},
                            {name: 'tFolder', type: 'string'},
                            {name: 'tTitle', type: 'string'},
                            {name: 'tLock', type: 'string'},
                            {name: 'tNoPrint', type: 'string'},
                            {name: 'tOrg', type: 'string'},
                            {name: 'tAdd', type: 'string'},
                            {name: 'tSize', type: 'string'},
                            {name: 'tActions', type: 'string'},
                            {name: 'tSummary', type: 'string'}
                        ],
                        hierarchy:
                            {
                                keyDataField: {name: 'tId'},
                                parentDataField: {name: 'tSummary'}
                            },
                        id: 'tId',
                        localData: json
                    };

            var dataAdapter = new $.jqx.dataAdapter(source);
            // create Tree Grid
            $(this).jqxTreeGrid({
                width: '100%',
//                height: 500,
                source: dataAdapter,
                theme: 'iltreegrid',
                columnsHeight: 35,
                columns: [
                    {text: '<span class=\"ilicon ilicon-doc-hollow\"></span>', dataField: 'tType', width: '5%'},
                    {text: '#', dataField: 'tNum', width: '7%'},
                    {text: 'Folder Location', dataField: 'tFolder', width: '15%'},
                    {text: 'Title', dataField: 'tTitle', width: '24%'},
                    {text: '<span class=\"ilicon ilicon-irm-lock\"></span>', dataField: 'tLock', width: '5%'},
                    {text: 'No Print', dataField: 'tNoPrint', width: '7%'},
                    {text: 'Organization', dataField: 'tOrg', width: '15%'},
                    {text: 'Added By', dataField: 'tAdd', width: '10%'},
                    {text: 'Size', dataField: 'tSize', width: '7%'},
                    {text: '<span class=\"ilicon ilicon-cog\"></span>', dataField: 'tActions', width: '5%'},
                    {text: '', dataField: 'tSummary', hidden:'true'},
                ],
                rowDetails: false,
                rowDetailsRenderer: function (rowKey, row) {
                    return row.tSummary;
                }
            });
        });
    });
    
    //dpDownWizAddMoreDetails
    $.getJSON("generatedComponents/JQXTreeGrid/sampleDownloadWizAddMoreDetails.json", function (json) {
        $(".dpDownWizAddMoreDetails").each(function(){
            // prepare the data
            var source =
                    {
                        dataType: "json",
                        dataFields: [
                            {name: 'tId', type: 'number'},
                            {name: 'tLock', type: 'string'},
                            {name: 'tType', type: 'string'},
                            {name: 'tNum', type: 'string'},
                            {name: 'tTitle', type: 'string'},
                            {name: 'tSize', type: 'string'}
                        ],
                        id: 'tId',
                        localData: json
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            // create Tree Grid
            $(this).jqxTreeGrid({
                width: '100%',
//                height: 500,
                source: dataAdapter,
                theme: 'iltreegrid',
                columnsHeight: 35,
                columns: [
                    {text: '<span class=\"ilicon ilicon-irm-lock\"></span>', dataField: 'tLock', width: '7%'},
                    {text: '<span class=\"ilicon ilicon-doc-hollow\"></span>', dataField: 'tType', width: '7%'},
                    {text: '#', dataField: 'tNum', width: '10%'},
                    {text: 'Title', dataField: 'tTitle', width: '66%'},
                    {text: 'Size', dataField: 'tSize', width: '10%'}
                ]
            });
        });
    });

    //dpDownWizAddMoreGroups
    $.getJSON("generatedComponents/JQXTreeGrid/sampleDownloadWizAddMoreGroups.json", function (json) {
        $(".dpDownWizAddMoreGroups").each(function(){
            // prepare the data
            var source =
                    {
                        dataType: "json",
                        dataFields: [
                            {name: 'tId', type: 'number'},
                            {name: 'tType', type: 'string'},
                            {name: 'tExchange', type: 'string'},
                            {name: 'tSize', type: 'string'},
                            {name: 'tActions', type: 'string'}
                        ],
                        id: 'tId',
                        localData: json
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            // create Tree Grid
            $(this).jqxTreeGrid({
                width: '100%',
//                height: 500,
                source: dataAdapter,
                theme: 'iltreegrid',
                columnsHeight: 35,
                columns: [
                    {text: '<span class=\"ilicon ilicon-exchange\"></span>', dataField: 'tType', width: '8%'},
                    {text: 'Exchange', dataField: 'tExchange', width: '75%'},
                    {text: 'Size', dataField: 'tSize', width: '10%'},
                    {text: '', dataField: 'tActions', width: '7%'},
                ]
            });
        });
    });
    
    //downloadWizardAddMore
    $.getJSON("generatedComponents/JQXTreeGrid/sampleDownloadWizAddMore.json", function (json) {
        $(".downloadWizardAddMore").each(function(){
            // prepare the data
            var source =
                    {
                        dataType: "json",
                        dataFields: [
                            {name: 'tId', type: 'number'},
                            {name: 'tLock', type: 'string'},
                            {name: 'tType', type: 'string'},
                            {name: 'tNum', type: 'string'},
                            {name: 'tTitle', type: 'string'},
                            {name: 'tPath', type: 'string'},
                            {name: 'tSize', type: 'string'},
                            {name: 'tActions', type: 'string'}
                        ],
                        id: 'tId',
                        localData: json
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            // create Tree Grid
            $(this).jqxTreeGrid({
                width: '100%',
//                height: 500,
                source: dataAdapter,
                theme: 'iltreegrid',
                columnsHeight: 35,
                columns: [
                    {text: '<span class=\"ilicon ilicon-irm-lock\"></span>', dataField: 'tLock', width: '5%'},
                    {text: '<span class=\"ilicon ilicon-copy\"></span>', dataField: 'tType', width: '5%'},
                    {text: '#', dataField: 'tNum', width: '5%'},
                    {text: 'Title', dataField: 'tTitle', width: '35%'},
                    {text: 'Path', dataField: 'tPath', width: '35%'},
                    {text: 'Size', dataField: 'tSize', width: '10%'},
                    {text: '', dataField: 'tActions', width: '5%'},
                ]
            });
        });
    });
    
    //fileDropArea
    $.getJSON("generatedComponents/JQXTreeGrid/sampleFileDrop.json", function (json) {
        $(".treeGridFileDropPH").each(function(){
            // prepare the data
            var source =
                    {
                        dataType: "json",
                        dataFields: [
                            {name: 'fdId', type: 'number'},
                            {name: 'fdNum', type: 'string'},
                            {name: 'fdTitle', type: 'string'},
                            {name: 'fdFormat', type: 'string'},
                            {name: 'fdSize', type: 'string'},
                            {name: 'fdActions', type: 'string'},
                            {name: 'fdActions2', type: 'string'}
                        ],
                        id: 'fdId',
                        localData: json
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            // create Tree Grid
            $(this).jqxTreeGrid({
                width: '100%',
//                height: 500,
                source: dataAdapter,
                theme: 'iltreegrid',
                columnsHeight: 35,
                columns: [
                    {text: '#', dataField: 'fdNum', width: '5%'},
                    {text: 'Document Title', dataField: 'fdTitle', width: '45%'},
                    {text: 'File Format', dataField: 'fdFormat', width: '15%'},
                    {text: 'File Size', dataField: 'fdSize', width: '15%'},
                    {text: '', dataField: 'fdActions', width: '15%'},
                    {text: '', dataField: 'fdActions2', width: '5%'}
                ]
            });
        });
    });
    
    //addDocWizGroupPerms
    $.getJSON("generatedComponents/JQXTreeGrid/sampleAddDocWizGroupPerms.json", function (json) {
        $(".treeGridAddDocWizGroupPerms").each(function(){
            // prepare the data
            var source =
                    {
                        dataType: "json",
                        dataFields: [
                            {name: 'tId', type: 'number'},
                            {name: 'tName', type: 'string'},
                            {name: 'tType', type: 'string'},
                            {name: 'tMem', type: 'string'},
                            {name: 'tPerm', type: 'string'}
                        ],
                        id: 'tId',
                        localData: json
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            // create Tree Grid
            $(this).jqxTreeGrid({
                width: '100%',
//                height: 500,
                source: dataAdapter,
                theme: 'iltreegrid',
                columnsHeight: 35,
                columns: [
                    {text: '<span class=\"ilicon ilicon-group\"></span> Group Name', dataField: 'tName', width: '50%'},
                    {text: 'Group Type', dataField: 'tType', width: '20%'},
                    {text: 'Members', dataField: 'tMem', width: '10%'},
                    {text: 'Permission Setting', dataField: 'tPerm', width: '20%'}
                ]
            });
        });
    });
    
    //addDocWizBuyerGroups
    $.getJSON("generatedComponents/JQXTreeGrid/sampleAddDocWizBuyerGroups.json", function (json) {
        $(".treeGridAddDocWizBuyerGroups").each(function(){
            // prepare the data
            var source =
                    {
                        dataType: "json",
                        dataFields: [
                            {name: 'tId', type: 'number'},
                            {name: 'tGroup', type: 'string'},
                            {name: 'tName', type: 'string'},
                            {name: 'tOrg', type: 'string'},
                            {name: 'tOAP', type: 'string'}
                        ],
                        hierarchy:
                            {
                                groupingDataFields:
                                        [
                                            {
                                                name: "tGroup"
                                            }
                                        ]
                            },
                        id: 'tId',
                        localData: json
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            // create Tree Grid
            $(this).jqxTreeGrid({
                width: '100%',
//                height: 500,
                source: dataAdapter,
                theme: 'iltreegrid',
                columnsHeight: 35,
                columns: [
                    {text: '<span class=\"ilicon ilicon-group\"></span> Name', dataField: 'tName', width: '40%'},
                    {text: 'Organization', dataField: 'tOrg', width: '30%'},
                    {text: 'Override Alert Preference', dataField: 'tOAP', width: '30%'}
                ]
            });
        });
    });

    //treeGridUsers
    $.getJSON("generatedComponents/JQXTreeGrid/sampleUsers.json", function (json) {
        $(".treeGridUsers").each(function(){
            // prepare the data
            var source =
                    {
                        dataType: "json",
                        dataFields: [
                            {name: 'tId', type: 'number'},
                            {name: 'tInfo', type: 'string'},
                            {name: 'tName', type: 'string'},
                            {name: 'tOrg', type: 'string'},
                            {name: 'tPhone', type: 'string'},
                            {name: 'tEmail', type: 'string'}
                        ],
                        id: 'tId',
                        localData: json
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            // create Tree Grid
            $(this).jqxTreeGrid({
                width: '100%',
//                height: 500,
                source: dataAdapter,
                theme: 'iltreegrid',
                columnsHeight: 35,
                columns: [
                    {text: '<span class="ilicon ilicon-info"></span>', dataField: 'tInfo', width: '5%', className: 'jqx-cell-ilicon-iltreegrid'},
                    {text: '<span><span class="ilicon ilicon-user"></span> Name</span>', dataField: 'tName', width: '30%', cellClassName: 'jqx-cell-highlighted-iltreegrid'},
                    {text: '<span>Organization</span>', dataField: 'tOrg', width: '20%'},
                    {text: '<span>Phone Number</span>', dataField: 'tPhone', width: '20%'},
                    {text: '<span>Email</span>', dataField: 'tEmail', width: '25%'}
                ]
            });
        });
    });
    

    //treeGridUsersSmall
    $.getJSON("generatedComponents/JQXTreeGrid/sampleUsersSmall.json", function (json) {
        $(".treeGridUsersSmall").each(function (){
            // prepare the data
            var source =
                    {
                        dataType: "json",
                        dataFields: [
                            {name: 'tId', type: 'number'},
                            {name: 'tInfo', type: 'string'},
                            {name: 'tName', type: 'string'},
                            {name: 'tOrg', type: 'string'},
                            {name: 'tPhone', type: 'string'},
                            {name: 'tEmail', type: 'string'}
                        ],
                        id: 'tId',
                        localData: json
                    };
                    
            var dataAdapter = new $.jqx.dataAdapter(source);

            $(this).jqxTreeGrid({
                width: '100%',
//                height: 500,
                source: dataAdapter,
                theme: 'iltreegrid',
                columnsHeight: 35,
                columns: [
                    {text: '<span class="ilicon ilicon-info"></span>', dataField: 'tInfo', width: '5%', className: 'jqx-cell-ilicon-iltreegrid'},
                    {text: '<span><span class="ilicon ilicon-user"></span> Name</span>', dataField: 'tName', width: '30%', cellClassName: 'jqx-cell-highlighted-iltreegrid'},
                    {text: '<span>Organization</span>', dataField: 'tOrg', width: '20%'},
                    {text: '<span>Phone Number</span>', dataField: 'tPhone', width: '20%'},
                    {text: '<span>Email</span>', dataField: 'tEmail', width: '25%'}
                ]
            });
        });
    });
    
     $(".jqxtreeUserPanelToggle").on("click",function (event){
            event.stopPropagation();
            // event args.


//            $(this).toggleClass('jqxtree50');
//            $(this).next(".userInfoPanel").each(function(){
//                $(this).toggleClass('hidden');
//            });
//            $(window).trigger('resize'); 
            
            //$(".popover-btn").popover({
            //$(this).prev('.popover-btn').popover('show');
            //$(this).parent().children(".popover-btn").popover('toggle');
            $(this).parent().children(".popover-infobox-btn").trigger("click");
            //console.log('test');
    });
    
    
    //resizeTreeGridHeights();

    var employees = [{ "EmployeeID": 1, "FirstName": "Nancy", "LastName": "Davolio", "ReportsTo": 2, "Country": "USA", "Title": "Sales Representative", "HireDate": "1992-05-01 00:00:00", "BirthDate": "1948-12-08 00:00:00", "City": "Seattle", "Address": "507 - 20th Ave. E.Apt. 2A" }, { "EmployeeID": 2, "FirstName": "Andrew", "LastName": "Fuller", "ReportsTo": null, "Country": "USA", "Title": "Vice President, Sales", "HireDate": "1992-08-14 00:00:00", "BirthDate": "1952-02-19 00:00:00", "City": "Tacoma", "Address": "908 W. Capital Way" }, { "EmployeeID": 3, "FirstName": "Janet", "LastName": "Leverling", "ReportsTo": 2, "Country": "USA", "Title": "Sales Representative", "HireDate": "1992-04-01 00:00:00", "BirthDate": "1963-08-30 00:00:00", "City": "Kirkland", "Address": "722 Moss Bay Blvd." }, { "EmployeeID": 4, "FirstName": "Margaret", "LastName": "Peacock", "ReportsTo": 2, "Country": "USA", "Title": "Sales Representative", "HireDate": "1993-05-03 00:00:00", "BirthDate": "1937-09-19 00:00:00", "City": "Redmond", "Address": "4110 Old Redmond Rd." }, { "EmployeeID": 5, "FirstName": "Steven", "LastName": "Buchanan", "ReportsTo": 2, "Country": "UK", "Title": "Sales Manager", "HireDate": "1993-10-17 00:00:00", "BirthDate": "1955-03-04 00:00:00", "City": "London", "Address": "14 Garrett Hill" }, { "EmployeeID": 6, "FirstName": "Michael", "LastName": "Suyama", "ReportsTo": 5, "Country": "UK", "Title": "Sales Representative", "HireDate": "1993-10-17 00:00:00", "BirthDate": "1963-07-02 00:00:00", "City": "London", "Address": "Coventry House Miner Rd." }, { "EmployeeID": 7, "FirstName": "Robert", "LastName": "King", "ReportsTo": 5, "Country": "UK", "Title": "Sales Representative", "HireDate": "1994-01-02 00:00:00", "BirthDate": "1960-05-29 00:00:00", "City": "London", "Address": "Edgeham Hollow Winchester Way" }, { "EmployeeID": 8, "FirstName": "Laura", "LastName": "Callahan", "ReportsTo": 2, "Country": "USA", "Title": "Inside Sales Coordinator", "HireDate": "1994-03-05 00:00:00", "BirthDate": "1958-01-09 00:00:00", "City": "Seattle", "Address": "4726 - 11th Ave. N.E." }, { "EmployeeID": 9, "FirstName": "Anne", "LastName": "Dodsworth", "ReportsTo": 5, "Country": "UK", "Title": "Sales Representative", "HireDate": "1994-11-15 00:00:00", "BirthDate": "1966-01-27 00:00:00", "City": "London", "Address": "7 Houndstooth Rd." }];
    // prepare the data
    var source =
    {
        dataType: "json",
        dataFields: [
            { name: 'EmployeeID', type: 'number' },
            { name: 'ReportsTo', type: 'number' },
            { name: 'FirstName', type: 'string' },
            { name: 'LastName', type: 'string' },
            { name: 'Country', type: 'string' },
            { name: 'City', type: 'string' },
            { name: 'Address', type: 'string' },
            { name: 'Title', type: 'string' },
            { name: 'HireDate', type: 'date' },
            { name: 'BirthDate', type: 'date' }
        ],
        hierarchy:
        {
            keyDataField: { name: 'EmployeeID' },
            parentDataField: { name: 'ReportsTo' }
        },
        id: 'EmployeeID',
        localData: employees
    };
    var dataAdapter = new $.jqx.dataAdapter(source);

    var cellsrenderer = function (value) {
        return value + '<a data-container="body" data-toggle="popover" rel="popover" data-html="true" data-placement="bottom" class="circlePop pull-right"><span class="circle"></span></a>';
    };

    //var testC = function (value) {
    //    return value + '<span class="pull-right ilicon ilicon-check"></span>';
    //};
    // create Tree Grid
    $(".nestedTree").jqxTreeGrid(
        {
            width: '100%',
            //height: '300',
            theme: 'iltreegrid',
            source: dataAdapter,
            altRows: true,
            ready: function () {
                $(".nestedTree").jqxTreeGrid('expandRow',2);
            },
            columns: [
                { text: 'FirstName', dataField: 'FirstName', pinned: true },
                { text: 'LastName', dataField: 'LastName' },
                { text: 'Title', dataField: 'Title', width: 200, cellsrenderer: cellsrenderer },
                { text: 'Country', dataField: 'Country', cellsrenderer: cellsrenderer },
                { text: 'City', dataField: 'City', cellsrenderer: cellsrenderer },
                { text: 'Address', dataField: 'Address' }
            ]
        });


    var permissionsModal = function (value) {
        return '<a href="" data-toggle="modal" data-target=".permissionsModal">' + value + '</a>';
    };

    $(".permissionsChanged").jqxTreeGrid(
        {
            width: '100%',
            //height: '300',
            theme: 'iltreegrid',
            source: dataAdapter,
            enableHover: false,
            altRows: true,
            ready: function () {
                $(".nestedTree").jqxTreeGrid('expandRow',2);
            },
            columns: [
                { text: 'FirstName', dataField: 'FirstName', pinned: true, cellsrenderer: permissionsModal },
                { text: 'LastName', dataField: 'LastName' },
                { text: 'Title', dataField: 'Title', width: 200 },
                { text: 'Address', dataField: 'Address' }
            ]
        });
});

