import Velocity  from 'velocity-animate';

function getOffset(element) {
    let top = 0, left = 0;
    while(element){
        top    += element.offsetTop  || 0;
        left   += element.offsetLeft || 0;
        element = element.offsetParent;
    }
    return {
        top: top,
        left: left
    };
}

function getId() {
    return `vue-materialize-tooltip-${Math.floor( Math.random() * 10000000000 )}`;
}

function showTooltip (id, target, tooltipPosition){
    const tooltip  = document.getElementById(id),
        backdrop = tooltip.querySelector('.backdrop');
    Velocity(tooltip, 'stop');
    Velocity(backdrop, 'stop');
    tooltip.style.display = 'block';
    tooltip.style.left    = '0px';
    tooltip.style.top     = '0px';
    const originWidth             = target.offsetWidth,
        originHeight              = target.offsetHeight,
        tooltipHeight             = tooltip.offsetHeight,
        tooltipWidth              = tooltip.offsetWidth,
        position                  = getOffset(target),
        margin                    = 10;
    let targetTop, 
        targetLeft, 
        newCoordinates,
        scale_factor              = 8,
        tooltipVerticalMovement   = '0px',
        tooltipHorizontalMovement = '0px';
    if (tooltipPosition === "top") { // Top Position
        targetTop      = position.top  - tooltipHeight - margin;
        targetLeft     = position.left + originWidth/2 - tooltipWidth/2;
        newCoordinates = repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);

        tooltipVerticalMovement        = '-10px';
        backdrop.style.borderRadius    = '14px 14px 0 0';
        backdrop.style.transformOrigin = '50% 90%';
        backdrop.style.marginTop       = tooltipHeight.toString() + 'px';
        backdrop.style.marginLeft      = ((tooltipWidth/2) - (backdrop.offsetWidth/2)).toString() + 'px';
    }else if (tooltipPosition === "left") {// Left Position
        targetTop      = position.top + originHeight/2 - tooltipHeight/2;
        targetLeft     = position.left - tooltipWidth - margin;
        newCoordinates = repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);
        
        tooltipHorizontalMovement = '-10px';

        backdrop.style.width           = '14px';
        backdrop.style.height          = '14px';
        backdrop.style.borderRadius    = '14px 0 0 14px';
        backdrop.style.transformOrigin = '95% 50%';
        backdrop.style.marginTop       = (tooltipHeight/2).toString() + 'px';
        backdrop.style.marginLeft      = tooltipWidth.toString() + 'px';
    }else if (tooltipPosition === "right") {// Right Position
        targetTop      = position.top + originHeight/2 - tooltipHeight/2;
        targetLeft     = position.left + originWidth + margin;
        newCoordinates = repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);

        tooltipHorizontalMovement = '+10px';
        
        backdrop.style.width           = '14px';
        backdrop.style.height          = '14px';
        backdrop.style.borderRadius    = '0 14px 14px 0';
        backdrop.style.transformOrigin = '5% 50%';
        backdrop.style.marginTop       = (tooltipHeight/2).toString() + 'px';
        backdrop.style.marginLeft      = '0px';
    } else {// Bottom Position
        targetTop      = position.top  + target.offsetHeight + margin;
        targetLeft     = position.left + originWidth/2 - tooltipWidth/2;
        newCoordinates = repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);
        
        tooltipVerticalMovement   = '+10px';
        
        backdrop.style.marginLeft = ((tooltipWidth/2) - (backdrop.offsetWidth/2)).toString() + 'px'
    }

    // Set tooptip css placement
    tooltip.style.top  = newCoordinates.y + 'px';
    tooltip.style.left = newCoordinates.x + 'px';

    // Calculate Scale to fill
    scale_factor = tooltipWidth / 8;
    if (scale_factor < 8) {
        scale_factor = 8;
    }
    if (tooltipPosition === "right" || tooltipPosition === "left") {
        scale_factor = tooltipWidth / 10;
        if (scale_factor < 6) scale_factor = 6;
    }
    Velocity(tooltip, {marginTop: tooltipVerticalMovement, marginLeft: tooltipHorizontalMovement}, {duration: 350, queue: false});
    Velocity(tooltip, {opacity: 1}, {duration: 300, delay: 50, queue: false});
    backdrop.style.display = 'block';
    Velocity(backdrop, {opacity:1}, {duration: 55, delay: 0, queue: false});
    Velocity(backdrop, {scale: scale_factor}, {duration: 300, delay: 0, queue: false, easing: 'easeInOutQuad'});
}

function makeTooltip (id, message){
    const text = document.createElement("span");
    text.textContent = message;

    const tooltip = document.createElement("div");
    tooltip.classList.add('material-tooltip');
    tooltip.appendChild(text);
    tooltip.setAttribute('id', id)

    const backdrop = document.createElement("div");
    backdrop.classList.add('backdrop');
    backdrop.style.top = '0';
    backdrop.style.left = '0';

    tooltip.appendChild(backdrop)
    
    document.body.appendChild(tooltip);
}

export default function (element, message, position = 'top', delay = 50) {
    let timeout = null,init = false,started;
    
    const id = (element.dataSet && element.dataSet.vueMaterializeTooltipId) ? element.dataSet.vueMaterializeTooltipId : getId();
    if (!element.dataSet || !element.dataSet.vueMaterializeTooltipId){ //初回
        init = true
        element.setAttribute('data-vue-materialize-tooltip-id',id)
        // element.dataSet.vueMaterializeTooltipId = id;
        makeTooltip(id, message);
    }

    const timeoutRef = setTimeout(function(){
        started = true;
        showTooltip(id, element, position);
    }, delay);

    if (!init) return;
    element.addEventListener("mouseleave", function () {
        started = false;
        clearTimeout(timeoutRef);

        // Animate back
        setTimeout(function() {
            if (started) return;
            const tooltip  = document.getElementById(id),
                backdrop = tooltip.querySelector('.backdrop');
            Velocity(tooltip, {opacity: 0, marginTop: 0, marginLeft: 0}, { duration: 225, queue: false});
            Velocity(backdrop, {opacity: 0, scale: 1}, {
                duration: 225,
                queue: false,
                complete: function() {
                    backdrop.style.display = 'none';
                    tooltip.style.display = 'none';
                    started = false;
                }
            });
        }, 225);
    });
};

var repositionWithinScreen = function(x, y, width, height) {
    var newX = x;
    var newY = y;

    if (newX < 0) {
        newX = 4;
    } else if (newX + width > window.innerWidth + window.scrollX) {
        newX = window.document.documentElement.offsetWidth - width;
    }

    if (newY < 0) {
        newY = 4;
    } else if (newY + height > window.innerHeight + window.scrollY) {
        newY = window.document.documentElement.offsetHeight - height;
    }

    return {x: newX, y: newY};
};