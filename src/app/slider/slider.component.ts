import { Component, OnInit, ViewChild } from '@angular/core';
import { Directive, Input, Output, ElementRef, Renderer } from '@angular/core';
import * as $ from 'jquery'; // into app.component.ts
import { inspectNativeElement } from '@angular/platform-browser/src/dom/debug/ng_probe';


import { trigger, state, style, transition, animate, keyframes, AnimationBuilder} from '@angular/animations';
import { LoadChildren } from '@angular/router/src/config';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { NgModule } from '@angular/core/src/metadata/ng_module';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  // animations:[{ transition :"none"}]
  
})


export class SliderComponent implements OnInit{

  @ViewChild('slidesContainer') slidesContainer: ElementRef;
  @ViewChild('arrowPrev') arrowPrev : ElementRef;
  @ViewChild('arrowNext') arrowNext: ElementRef;
  @ViewChild('sliderWrapper') sliderWrapper: ElementRef;


  @Input()
  items : Array<object> = [];

  @Input()
  bBackgroundContain : boolean = false;
  
  @Input() sliderHeight : string = "60vh";
  @Input() backgroundColor : string = "orange";

  @Input() bDisplayNavigation : boolean = true;
  
  @Input()
  showNumImage : number = 1;

  @Input()
  autoPlay: boolean = true;

  @Input()
  autoPlayDelay : number = 15; //seconds



  @Input() bIsDraggable : boolean = false;
  @Input() bShowScaleButton : boolean = false;

  topComponent : object;
  currentId : number = 0;
  containerWidth : number = 0;
  isDragging : boolean = false;
  isMouseDown : boolean = false;
  isMouseOver : boolean = false;

  lastX : number = null;
  lastY : number = null;

  deltaX : number;
  deltaY : number;

  accuX : number = 0.0;
  sliderPositionX : number;

  
  container : any;
  
  root : any;
  animationPlayer; 
  
  bDataFound : boolean = false;
  
  autoplayInterval : number;
  autoPlayReverse : boolean = false;
  
  
  //trying to use dragging and arrows at the same time so creating some booleans to test for arrow press
  bArrowPrevPressed : boolean = false;
  bArrowNextPressed: boolean = false;

  bHideArrowPrev : boolean = false;
  bHideArrowNext : boolean = false;

  constructor(private el: ElementRef) {

    // console.log(this.items);
    if(this.items.length === 0){

      this.items = [
        { url: "assets/img/oeufs_1.jpg" },
        { url: "assets/img/oeufs_2.jpg" },
        { url: "assets/img/oeufs_1.jpg" },
        // { url: "assets/img/oeufs_1.jpg" },
        // { url: "assets/img/oeufs_1.jpg" },
      ]; 
    }

    
    this.deltaX = 0.0;
    this.deltaY = 0.0;

    
    this.sliderPositionX = 0.0;   

    
  }

  
  ngOnInit()
  {
    

  }

  ngAfterViewInit(){
    this.arrowPrev = this.arrowPrev.nativeElement;
    this.arrowNext = this.arrowNext.nativeElement;
    this.container = this.sliderWrapper.nativeElement;

    this.initSize();

    $(this.container).css({ height: this.sliderHeight, backgroundColor:this.backgroundColor });
    // console.log($(this.container));
    // console.log($(this.container).height());

    this.root = $(this.el.nativeElement.children[0].children[0]);

    if (this.autoPlay) {
      this.autoPlaySlider();
    }


    // console.log(this.currentId)
    if (this.currentId === 0) {
      // $(this.arrowPrev).css({ visibility: 'hidden' });
      this.bHideArrowPrev = true;
    }
    if (this.currentId === this.items.length - this.showNumImage) {
      // $(this.arrowNext).css({ visibility: 'hidden' });
      this.bHideArrowNext = true;
    }
  }

  initSize()
  {
    this.containerWidth = this.container.offsetWidth / this.showNumImage;   
  }

  nextSlide(event = undefined)
  {
    if (event) {
      event.stopPropagation();
    }
    
    
    if (this.currentId < this.items.length-1)
    {
      this.currentId++;
    } 
    // console.log(this.currentId);
    this.animateSlider(this.currentId);
  }

  prevSlide(event = undefined)
  {
    if(event){

      event.stopPropagation();
    }
    if (this.currentId > 0) {
      this.currentId--;
    } 
  
    this.animateSlider(this.currentId);
    
  }  

  getWidth()
  {
    return this.containerWidth;
  }

  onMouseDown(event)
  {

    event.preventDefault();
    event.stopPropagation();
    this.root.addClass('no-transition');
    this.isMouseDown = true;
    this.autoPlay = false;
    
  }

  onTouchStart(event)
  {
    if(this.bIsDraggable){
      
      // console.log(event.type);
      // event.preventDefault();
      // event.stopPropagation();
      
      this.isMouseDown = true;
      this.autoPlay = false;
    }
    // console.log(event.type);
    this.autoPlay = false;
    window.clearInterval(this.autoplayInterval);
  }


  onClick(event)
  {
    
    event.preventDefault();
    event.stopPropagation();

    this.root.removeClass("no-transition");
    this.autoPlay = false;
    window.clearInterval(this.autoplayInterval);
    
  }
  
  onArrowPrevClick(event){
    this.bArrowPrevPressed = true;
    this.prevSlide();
  }

  onArrowNextClick(event) {
    this.bArrowNextPressed = true;
    // this.nextSlide();
  }

  onArrowDown(event)
  {
    // event.preventDefault();
    // event.stopPropagation();
    
    this.root.removeClass('auto-play-transition');
    this.root.removeClass('no-transition');    
    this.autoPlay = false;
    window.clearInterval(this.autoplayInterval);
    
  }

  onMouseUp(event) 
  {
    event.preventDefault();
    event.stopPropagation();    
  
    this.isMouseDown = false;
    this.lastX = this.lastY = null;
    this.root.removeClass('no-transition');
    if(this.isDragging){
      
      if ((this.accuX) > this.containerWidth / 4.0 ){
        
        if (this.currentId > 0)
        {
          this.currentId--;
        }

        
      } else if (this.accuX < -this.containerWidth / 4.0){
      
        if(this.currentId < this.items.length - 1)
        {
          this.currentId++;          
        }
      }
      this.animateSlider(this.currentId);
      this.isDragging = false;
    }
    this.accuX = 0.0;
  }  
  scaleGalleryIcon(event){
    this.bBackgroundContain = !this.bBackgroundContain;

  }

  onMouseLeave(event) 
  {    
    this.animateSlider(this.currentId);
    this.isMouseDown = false;
    this.accuX = 0.0;

  } 
  
  onMouseEnter(event) {
    // $('#scaleGalleryIcon').css({
    //   opacity: 0.9
    // })
    //   console.log("mouse enter");
  }  
  onMouseMove(event) 
  {    

    if(this.isMouseDown && this.bIsDraggable)
    {
      this.root.removeClass('auto-play-transition');
      this.root.addClass('no-transition');
      this.autoPlay = false;
      window.clearInterval(this.autoplayInterval);
      let x : number;
      let y : number;
      
      if(event.type === 'touchmove'){
        x = event.touches[0].clientX;
        y = event.touches[0].clientY;
      }else{
        x = event.clientX;
        y = event.clientY;
      }
      this.isDragging = true;
      if(this.lastX !== null ){
        this.deltaX =  x - this.lastX;   
        this.lastX = x;
      }else{
        this.lastX = x;
      }
      
      this.sliderPositionX += this.deltaX;

      this.accuX += this.deltaX;

      this.root.css({
        transform: "translate3d(" + this.sliderPositionX + "px,0,0) rotate(0.001deg)"
      });      
    }else{
      let x: number;
      let y: number;

      if (event.type === 'touchmove') {
        x = event.touches[0].clientX;
        y = event.touches[0].clientY;
      } else {
        x = event.clientX;
        y = event.clientY;
      }
      if (this.lastX !== null) {
        this.deltaX = x - this.lastX;
        this.lastX = x;
      } else {
        this.lastX = x;
      }
    }

  }


  onResize(event){
    this.initSize();    
    this.animateSlider(this.currentId);
  }

  animateSlider(id : number){

    // console.log(this.currentId);
    // console.log(this.arrowPrev);
    
    this.sliderPositionX = -this.containerWidth * id;
    
    this.root.css({ transform: 'translateX(' + this.sliderPositionX +'px) rotate(0.001deg)'});

    if (id <= 0) {
      this.bHideArrowPrev= true;
      // $(this.arrowPrev).css({ visibility: 'hidden' });
    }else{      
      // console.log("show !!!!!");
      this.bHideArrowPrev = false;
      // $(this.arrowPrev).css({ visibility: 'visible' });
    }
    if (id + this.showNumImage-1  >= this.items.length-1) {

      this.bHideArrowNext = true;
      // $(this.arrowNext).css({ visibility: 'hidden' });
    }else{
      this.bHideArrowNext = false;
      // $(this.arrowNext).css({ visibility: 'visible' });
    }
  }

  onBulletClick(event, id){

    event.preventDefault();
    event.stopPropagation();
    
    this.root.removeClass("no-transition");
    this.root.addClass("auto-play-transition");
    this.autoPlay = false;
    window.clearInterval(this.autoplayInterval);
    this.currentId = id;
    this.animateSlider(this.currentId);


  }

  autoPlaySlider(){
    this.autoplayInterval = setInterval(this.autoPlayFunction.bind(this),this.autoPlayDelay * 1000)
  }

  autoPlayFunction(){
    this.root.addClass('auto-play-transition');
    this.root.removeClass('no-transition');
    if(this.currentId === this.items.length - this.showNumImage){
      this.autoPlayReverse = true;
    }else if(this.currentId === 0){
      this.autoPlayReverse = false;
    }

    if(this.autoPlay)
    {
      if( !this.autoPlayReverse ){
        this.nextSlide();
      }else{
        this.prevSlide();
      }

    }

  }
}
