customElements.define("inline-circle", class InlineCircle extends HTMLElement {
    connectedCallback() {
        this.style.display = "inline-block";
        this.style.borderRadius = "50%";
        this.style.borderStyle = "solid";
        this.style.transform = "translateY(10%)";

        if(!this.style.width) {
            this.style.width = "0.8em";
            this.style.height = "0.8em";
        }
        
        // 属性が設定されていない場合はデフォルト値を設定
        if(!this.style.borderColor) {
            this.style.borderColor = "black";
        }

        if(!this.style.borderWidth) {
            this.style.borderWidth = "1px";
        }
    }

    // border-color と border-width を追加
    static get observedAttributes(){return ["diameter", "color", "border-color", "border-width"];}

    attributeChangedCallback(name, oldValue, newValue){
        switch(name){
            case "diameter":
                this.style.width = newValue;
                this.style.height = newValue;
                break;
            case "color":
                this.style.backgroundColor = newValue;
                break;
            case "border-color":
                this.style.borderColor = newValue;
                break;
            case "border-width":
                this.style.borderWidth = newValue;
                break;
        }
    }

    get diameter() { return this.getAttribute("diameter"); }
    set diameter(diameter) { this.setAttribute("diameter", diameter); }
    get color() { return this.getAttribute("color"); }
    set color(color) { this.setAttribute("color", color); }
    // borderColor のゲッターとセッターを追加
    get borderColor() { return this.getAttribute("border-color"); }
    set borderColor(borderColor) { this.setAttribute("border-color", borderColor); }
    // borderWidth のゲッターとセッターを追加
    get borderWidth() { return this.getAttribute("border-width"); }
    set borderWidth(borderWidth) { this.setAttribute("border-width", borderWidth); }
});