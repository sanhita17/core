$(document).ready(function () {

    //treeUsers
    $.getJSON("generatedComponents/JQXTree/sampleUsersAndGroups.json", function (json) {
        $(".jqxTreeUsers").each(function () {
            // prepare the data
            var source =
                    {
                        datatype: "json",
                        datafields: [
                            {name: 'id'},
                            {name: 'parentid'},
                            {name: 'text'},
                            {name: 'value'}
                        ],
                        id: 'id',
                        localdata: json
                    };
            // create data adapter.
            var dataAdapter = new $.jqx.dataAdapter(source);
            // perform Data Binding.
            dataAdapter.dataBind();
            // get the tree items. The first parameter is the item's id. The second parameter is the parent item's id. The 'items' parameter represents 
            // the sub items collection name. Each jqxTree item has a 'label' property, but in the JSON data, we have a 'text' field. The last parameter 
            // specifies the mapping between the 'text' and 'label' fields.  
            var records = dataAdapter.getRecordsHierarchy('id', 'parentid', 'items', [{name: 'text', map: 'label'}]);
            $(this).jqxTree({source: records, width: '100%', theme: 'iltreegrid', allowDrag: false, allowDrop: false,toggleMode: 'click'});
            $(this).jqxTree('expandAll');
        });
    });

    $.getJSON("generatedComponents/JQXTree/sampleNested.json", function (json) {
        $(".jqxTreeNest").each(function () {
            // prepare the data
            var source =
                    {
                        datatype: "json",
                        datafields: [
                            {name: 'id'},
                            {name: 'parentid'},
                            {name: 'text'},
                            {name: 'value'}
                        ],
                        id: 'id',
                        localdata: json
                    };
            // create data adapter.
            var dataAdapter = new $.jqx.dataAdapter(source);
            // perform Data Binding.
            dataAdapter.dataBind();
            // get the tree items. The first parameter is the item's id. The second parameter is the parent item's id. The 'items' parameter represents 
            // the sub items collection name. Each jqxTree item has a 'label' property, but in the JSON data, we have a 'text' field. The last parameter 
            // specifies the mapping between the 'text' and 'label' fields.  
            var records = dataAdapter.getRecordsHierarchy('id', 'parentid', 'items', [{name: 'text', map: 'label'}]);
            $(this).jqxTree({source: records, width: '100%', height: 500, theme: 'iltreegrid', allowDrag: false, allowDrop: false,toggleMode: 'click'});
            //can't expand on init when source is JSON(http://www.jqwidgets.com/community/topic/how-to-expand-a-tree-item-where-source-is-json/), so we do this:
            $(this).jqxTree('expandAll');
        });
    });
});