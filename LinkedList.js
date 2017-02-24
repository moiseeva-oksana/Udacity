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
        var start = Date.now();
        if(position<0 || position>this.size) {
            alert("Invalid position value: " + position);
            return;
        }
        var result = this.start;
        for (var i=0; i<position; i++) {
            result = result.nextNode;
        }
        var finish = Date.now();
        console.log("Get: " + (finish-start) + "ms");
        return result;
    };

    this.insert = function (position, entity) {
        var start = Date.now();
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
        var finish = Date.now();
        console.log("Insert: " + (finish-start) + "ms");
    };

    this.remove = function (entity) {
        var start = Date.now();
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
        var finish = Date.now();
        console.log("Remove: " + (finish-start) + "ms");
    };
}

function NodeInList(entity) {
    this.nextNode = null;
    this.entity = entity;
}

var linkedList = new LinkedList();
for (var i=0; i<1000000; i++) {
    linkedList.add("Element " +i);
}

linkedList.get(2);
console.log("_________");
linkedList.insert(2, "Lalala");
console.log("_________");
linkedList.remove("Element 1");

