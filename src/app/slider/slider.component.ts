import { Component, OnInit } from '@angular/core';
import { Directive, Input, Output, ElementRef, Renderer } from '@angular/core';
import * as jQuery from 'jquery'; // into app.component.ts
import { inspectNativeElement } from '@angular/platform-browser/src/dom/debug/ng_probe';


import { trigger, state, style, transition, animate, keyframes, AnimationBuilder} from '@angular/animations';
import { LoadChildren } from '@angular/router/src/config';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { NgModule } from '@angular/core/src/metadata/ng_module';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  // animations:[{ transition :"none"}]
  
})


export class SliderComponent implements OnInit{

  @Input()
  items : Array<object> = [];
  
  @Input()
  sliderHeight : number = 300;

  @Input()
  bDisplayNavigation : boolean = true;

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

  autoPlay : boolean = true;
  autoplayInterval : number;
  autoPlayReverse : boolean = false;
  constructor(private el: ElementRef) {
    this.items = [
      { url: "assets/img/oeufs_1.jpg" },
      { url: "assets/img/oeufs_2.jpg" },
      { url: "assets/img/oeufs_1.jpg" },
      { url: "assets/img/oeufs_1.jpg" },
    ]; 

    
    this.deltaX = 0.0;
    this.deltaY = 0.0;

    
    this.sliderPositionX = 0.0;   

    
  }

  
  ngOnInit()
  {
    console.log(this.el.nativeElement);
    this.container = this.el.nativeElement.children[0];
    jQuery(this.container).css({ height:this.sliderHeight});
    //console.log(this.el.nativeElement.children[4]);
    this.initSize();
    // this.root = jQuery(this.container.firstChild);
    this.root = jQuery(this.el.nativeElement.children[0].children[0]);   
    
    if(this.autoPlay){
      this.autoPlaySlider();
    }
  }

  initSize()
  {
    this.containerWidth = this.container.offsetWidth / 1.0;   
  }

  nextSlide()
  {

    if (this.currentId < this.items.length-1)
    {
      this.currentId++;
    } 
   
    this.animateSlider(this.currentId);
  }

  prevSlide()
  {

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
  }

  onTouchStart(event)
  {
    console.log(event.type);
    event.preventDefault();
    event.stopPropagation();
    // this.root.addClass('no-transition');
    this.isMouseDown = true;
    this.autoPlay = false;
  
  }


  onClick(event)
  {
    console.log("click !!! ");
    event.preventDefault();
    event.stopPropagation();

    this.root.removeClass("no-transition");
    
  }
  
  onArrowDown(event)
  {
    event.preventDefault();
    event.stopPropagation();
    
    this.root.removeClass('auto-play-transition');
    this.root.removeClass('no-transition');    
    this.autoPlay = false;
    window.clearInterval(this.autoplayInterval);
    console.log(event.type);
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
      
        if (this.currentId >  0)
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


  onMouseLeave(event) 
  {    
    this.animateSlider(this.currentId);
    this.isMouseDown = false;
    this.accuX = 0.0;
  } 

  onMouseMove(event) 
  {    

    if( this.isMouseDown)
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
        transform: "translate(" + this.sliderPositionX + "px,0)"
      });      
    }

  }

  onMouseEnter(event) {
      // console.log("mouse enter");
  }  

  onResize(event){
    this.initSize();    
  }

  animateSlider(id : number){

    this.sliderPositionX = -this.containerWidth * id;

    this.root.css({ transform: 'translate(' + this.sliderPositionX +'px,0)'});

  }

  onBulletClick(event, id){

    event.preventDefault();
    event.stopPropagation();
    // console.log(event.type, id);
    this.root.removeClass("no-transition");
    this.root.addClass("auto-play-transition")
    this.autoPlay = false;
    window.clearInterval(this.autoplayInterval);
    this.currentId = id;
    this.animateSlider(this.currentId);


  }

  autoPlaySlider(){
    this.autoplayInterval = setInterval(this.autoPlayFunction.bind(this),3000)
  }

  autoPlayFunction(){
    this.root.addClass('auto-play-transition');
    this.root.removeClass('no-transition');
    if(this.currentId === this.items.length-1){
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
