"use strict";
function LinkedList() {
    this.head = null;
    this.size = 0;
    this.start = null;
    
    this.add = function (entity) {
        var nodeInList = new NodeInList(entity);
        if(this.start===null) {
            this.start = nodeInList;
        }
        if(this.size>0) {
            this.head.nextNode = nodeInList;
        }
        this.head = nodeInList;
        this.size++;
    };

    this.get = function (position) {
        if(position<0 || position>this.size) {
            alert("Invalid position value: " + position);
            return;
        }
        var result = this.start;
        for (var i=0; i<position; i++) {
            result = result.nextNode;
        }
        return result;
    };

    this.insert = function (position, entity) {
        if(position>=this.size) {
            alert("It's not possible to insert an element to position " + position +", because size of the list is " + this.size);
            return;
        }
        var oldNode = this.get(position);
        var newNode = new NodeInList(entity);
        newNode.nextNode=oldNode;
        if(oldNode===this.start) {
            this.start = newNode;
        }
        else {
            this.get(position-1).nextNode=newNode;
        }
        this.size++;
    };

    this.remove = function (entity) {
        var iteration = this.start;
        var nodeToRemove = null;
        var index = -1;
        for(var i=0; i<this.size; i++) {
            if(iteration.entity===entity) {
                nodeToRemove=iteration;
                index=i;
                break;
            }
            iteration=iteration.nextNode;
        }
        if(nodeToRemove===null) {
            alert("No such element in the list");
            return;
        }
        if(nodeToRemove===this.head) {
            this.head=this.get(index-1);
        }
        if (nodeToRemove===this.start) {
            this.start=nodeToRemove.nextNode;
        }
        else {
            this.get(index-1).nextNode=nodeToRemove.nextNode;
        }

        this.size--;
    };
}

function NodeInList(entity) {
    this.nextNode = null;
    this.entity = entity;
}



function benchmark(size, position) {
    var linkedList = new LinkedList();
    for (var i=0; i<size; i++) {
        linkedList.add("Element " +i);
    }
    var start = Date.now();
    var str = linkedList.get(position);
    var finish = Date.now();
    console.log("Get in LinkedList: " + (finish-start) + "ms");
    start = Date.now();
    linkedList.insert(position, "Lalala");
    finish = Date.now();
    console.log("Insert to LinkedList: " + (finish-start) + "ms");
    start = Date.now();
    linkedList.remove("Element "+position);
    finish = Date.now();
    console.log("Remove from LinkedList: " + (finish-start) + "ms");

    var arr = [];
    for (var i=0; i<size; i++) {
        arr.push("Element " +i);
    }
    start = Date.now();
    var arrstr = arr[position];
    finish = Date.now();
    console.log("Get in Array: " + (finish-start) + "ms");
    start = Date.now();
    arr.splice(position, 0, "Lalala");
    finish = Date.now();
    console.log("Insert to Array: " + (finish-start) + "ms");
    start = Date.now();
    arr.splice(position, 1);
    finish = Date.now();
    console.log("Remove from Array: " + (finish-start) + "ms");
}
benchmark(1000, 999);


