/**
 *
 * @authors Your Name (you@example.org)
 * @date    2015-08-31 12:09:32
 * @version $Id$
 */

 app.controller("treeCtrl", ['$scope', function($scope) {
    $scope.treeData = [{
        id: 1,
        pId: 0,
        isParent:true,
        name: "普通的父节点",
        title: "我很普通，随便点我吧",
        open:true,
        iconSkin:"parent"
    },  {
        id: 2,
        pId: 0,
        name: "NB的父节点",
        title: "点我可以，但是不能点我的子节点，有本事点一个你试试看？",
        open: true,
        iconSkin:"parent"
    }, {
        id: 3,
        pId: 0,
        name: "郁闷的父节点",
        title: "别点我，我好害怕...我的子节点随便点吧...",
        open: true,
        iconSkin:"parent"
    }];

    var children=[{
        id: 11,
        pId: 1,
        name: "叶子节点 - 1",
        title: "我很普通，随便点我吧",
        iconSkin:"leaf"
    }, {
        id: 12,
        pId: 1,
        name: "叶子节点 - 2",
        title: "我很普通，随便点我吧",
        iconSkin:"leaf"
    }, {
        id: 13,
        pId: 1,
        name: "叶子节点 - 3",
        title: "我很普通，随便点我吧",
        iconSkin:"leaf"
    }];

    $scope.getData=function(){
        return children;
    }

    $scope.nodeClick=function(treeNode,treeObj)
    {
        console.log("treeNode=",treeNode);
        console.log("parentNode=",treeNode.getParentNode());
        console.log("treeObj=",treeObj);
        treeObj.addNodes(treeNode,children,false);
    }

}]);
