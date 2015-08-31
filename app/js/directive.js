/**
 *
 * @authors Your Name (you@example.org)
 * @date    2015-08-31 10:41:05
 * @version $Id$
 */
app.directive("customHello", function() {
    return {
        reistrict: "EA",
        template: '<div>Hello<span ng-transclude></span></div>',
        transclude: true,
    };
});

app.directive("customTree", function() {
    var dirObj = {
        reistrict: "A",
        require: '?ngModel',
        scope: {
            treeData: '=treeData',
            nodeClick: '=nodeClick',
            getData:'=getData'
                /*            selectedNodes:'=selectedNodes'*/
        },
        link: function(scope, element, attrs, ngModel) {
            var setting = {
                /*        check: {
                            enable: true
                        },*/
                edit: {
                    enable: true
                },
                async: {
                    enable: true,
                    autoParam:["id"],
                    url: scope.getData()
                },
                data: {
                    simpleData: {
                        enable: true,
                        idKey: "id",
                        pIdKey: "pId",
                        rootPId: 0
                    }
                },
                view: {
                    showIcon: true,
                    showLine: true,
                    showTitle: true
                },
                edit: {

                },
                callback: {
                    onClick: treeNodeClick,
                }
            };

            $.fn.zTree.init(element, setting, scope.treeData);
            var treeObj = $.fn.zTree.getZTreeObj(attrs.id);

            //节点点击事件
            function treeNodeClick(event, treeId, treeNode) {
                if (!angular.isUndefined(scope.nodeClick)) {
                    scope.nodeClick(treeNode,treeObj);
                }
                /*   ngModel.$setViewValue(treeNode);*/
            }


        }
    };
    return dirObj;
});
