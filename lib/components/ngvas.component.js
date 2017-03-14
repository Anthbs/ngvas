"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const CanvasGroup_1 = require("../canvas/CanvasGroup");
const base_component_1 = require("./base.component");
let NgvasComponent = class NgvasComponent {
    constructor(document, elRef) {
        this.document = document;
        this.elRef = elRef;
        this._width = 0;
        this._height = 0;
        this._isActive = true;
        this._shape = new core_1.EventEmitter();
    }
    set width(w) {
        this._width = +w;
    }
    set height(h) {
        this._height = +h;
    }
    set active(a) {
        this._isActive = a;
    }
    get shape() {
        return this._shape;
    }
    getShape() {
        return this._canvasGroup;
    }
    /**
     * Fires once after ng-content is intitialized.
     */
    ngAfterContentInit() {
        const canvas = this.document.createElement("canvas");
        canvas.width = this._width;
        canvas.height = this._height;
        this.elRef.nativeElement.appendChild(canvas);
        this._canvasGroup = new CanvasGroup_1.CanvasGroup(canvas, undefined, this._isActive);
        this.contentChildren.forEach(c => this._canvasGroup.addChild(c.initShape(this._canvasGroup.context)));
        this.shape.emit(this._canvasGroup);
        this._contentSubscription = this.contentChildren.changes
            .subscribe(c => {
            this._canvasGroup.removeAllChildren();
            c.forEach((c2) => this._canvasGroup.addChild(c2.initShape(this._canvasGroup.context)));
        });
    }
    /**
     * Fires when the component is destroyed.
     */
    ngOnDestroy() {
        this._canvasGroup.isActive = false;
        this._canvasGroup.removeAllChildren();
        if (this._contentSubscription !== undefined) {
            this._contentSubscription.unsubscribe();
        }
    }
};
__decorate([
    core_1.ContentChildren(base_component_1.NgvasBaseComponent),
    __metadata("design:type", core_1.QueryList)
], NgvasComponent.prototype, "contentChildren", void 0);
__decorate([
    core_1.Input("width"),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], NgvasComponent.prototype, "width", null);
__decorate([
    core_1.Input("height"),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], NgvasComponent.prototype, "height", null);
__decorate([
    core_1.Input("active"),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NgvasComponent.prototype, "active", null);
__decorate([
    core_1.Output("shape"),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NgvasComponent.prototype, "shape", null);
NgvasComponent = __decorate([
    core_1.Component({
        // moduleId: String(module.id),
        selector: "ngvas",
        template: "<ng-content></ng-content>",
        styles: [":not(canvas) { display: none; }"],
    }),
    __param(0, core_1.Inject(platform_browser_1.DOCUMENT)),
    __param(1, core_1.Inject(core_1.ElementRef)),
    __metadata("design:paramtypes", [Document,
        core_1.ElementRef])
], NgvasComponent);
exports.NgvasComponent = NgvasComponent;
//# sourceMappingURL=ngvas.component.js.map