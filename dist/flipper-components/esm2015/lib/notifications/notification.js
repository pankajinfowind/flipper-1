export class Notification {
    constructor(id, type, title, message, timeout) {
        this.id = id;
        this.type = type;
        this.title = title;
        this.message = message;
        this.timeout = timeout;
    }
}
export var NotificationType;
(function (NotificationType) {
    NotificationType[NotificationType["success"] = 0] = "success";
    NotificationType[NotificationType["warning"] = 1] = "warning";
    NotificationType[NotificationType["error"] = 2] = "error";
    NotificationType[NotificationType["info"] = 3] = "info";
})(NotificationType || (NotificationType = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvZmxpcHBlci1jb21wb25lbnRzL3NyYy9saWIvbm90aWZpY2F0aW9ucy9ub3RpZmljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxPQUFPLFlBQVk7SUFDdkIsWUFDUyxFQUFVLEVBQ1YsSUFBc0IsRUFDdEIsS0FBYSxFQUNiLE9BQWUsRUFDZixPQUFlO1FBSmYsT0FBRSxHQUFGLEVBQUUsQ0FBUTtRQUNWLFNBQUksR0FBSixJQUFJLENBQWtCO1FBQ3RCLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDYixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2YsWUFBTyxHQUFQLE9BQU8sQ0FBUTtJQUNyQixDQUFDO0NBQ0w7QUFFRCxNQUFNLENBQU4sSUFBWSxnQkFLWDtBQUxELFdBQVksZ0JBQWdCO0lBQzFCLDZEQUFXLENBQUE7SUFDWCw2REFBVyxDQUFBO0lBQ1gseURBQVMsQ0FBQTtJQUNULHVEQUFRLENBQUE7QUFDVixDQUFDLEVBTFcsZ0JBQWdCLEtBQWhCLGdCQUFnQixRQUszQiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBOb3RpZmljYXRpb24ge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIGlkOiBudW1iZXIsXHJcbiAgICBwdWJsaWMgdHlwZTogTm90aWZpY2F0aW9uVHlwZSxcclxuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nLFxyXG4gICAgcHVibGljIG1lc3NhZ2U6IHN0cmluZyxcclxuICAgIHB1YmxpYyB0aW1lb3V0OiBudW1iZXJcclxuICApIHt9XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIE5vdGlmaWNhdGlvblR5cGUge1xyXG4gIHN1Y2Nlc3MgPSAwLFxyXG4gIHdhcm5pbmcgPSAxLFxyXG4gIGVycm9yID0gMixcclxuICBpbmZvID0gMyxcclxufVxyXG4iXX0=