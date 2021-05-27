

class DomParser{
     
    constructor(){
       
    }

    async getJSON(initElement: string):Promise<JSON>{

        var res = this.mapDOM(initElement);
        return res; 
    }

    async mapDOM(element: string):Promise<JSON>{
        var treeObject = {};
        
        const jsdom = require('jsdom'); 
        const dom = new jsdom.JSDOM(element);  
        let docNode = dom.window.document; 
        element = docNode;   
        
        //Recursively loop through DOM elements and assign properties to object
        function treeHTML(element, object) {
            object["type"] = element.nodeName;
            var nodeList = element.childNodes;
            if (nodeList != null) {
                if (nodeList.length) {
                    object["content"] = [];
                    for (var i = 0; i < nodeList.length; i++) {
                        if (nodeList[i].nodeType == 3) {
                            object["content"].push(nodeList[i].nodeValue);
                        } else {
                            object["content"].push({});
                            treeHTML(nodeList[i], object["content"][object["content"].length -1]);
                        }
                    }
                }
            }
            if (element.attributes != null) {
                if (element.attributes.length) {
                    object["attributes"] = {};
                    for (var i = 0; i < element.attributes.length; i++) {
                        object["attributes"][element.attributes[i].nodeName] = element.attributes[i].nodeValue;
                    }
                }
            }
        }
        
        treeHTML(element, treeObject);
        
        return JSON.parse(JSON.stringify(treeObject));
    }
}

export default DomParser;