
window.onload = ()=>{
	myGallery();
}

////////////////////////////////////////////////////////////////////////
//"Parents" method by Juan Escudero 2020
const parent = {

	parents: function(item, choosenParentsSelector){

		if(item, choosenParentsSelector){

			let itemParents = item.parentElement;
			let i = 0;

			while(i, !itemParents.querySelector(choosenParentsSelector) && i < 50 && itemParents != null){
				item = itemParents;
				itemParents = item.parentElement;
				i ++;
			}

			return item;

		}

	}

}
////////////////////////////////////////////////////////////////////////
//Use: parent.parents(myElement,'.parent-element-selector')
////////////////////////////////////////////////////////////////////////

myGallery = ()=>{

	const mainBody = document.querySelector('body');

	const myGallery = document.querySelector('[data-my-gallery]');

	const myGalleryItem = myGallery.querySelectorAll('.item');

	const myGalleryModal = document.createElement('div');
	myGalleryModal.className = 'my-gallery-modal-wrap';
	myGalleryModal.innerHTML = `

		<div class="my-gallery-modal-content">
			<div class="my-gallery-modal-img-group">	

			</div>
			<div class="navigation">
				<button class="gal-navigation gal-left-button" type="button" title="Ir a imagen anterior">Prev</button>
				<button class="gal-navigation gal-right-button" type="button" title="Ir a imagen posterior">Next</button>
			</div>
		</div>
		<button class="close-overlay"></button>
	
	`;

	myGallery.parentElement.insertBefore(myGalleryModal,myGallery);

	for(let i = 0; myGalleryItem[i]; i ++){
		const initImg = myGalleryItem[i];
		const clonedImg = initImg.cloneNode(true);
		const putImgOnTarget = parent.parents(initImg,'.my-gallery').previousElementSibling.querySelector('.my-gallery-modal-img-group');
		putImgOnTarget.appendChild(clonedImg);
		
		initImg.setAttribute('data-index',i);

		const modalItems = putImgOnTarget.querySelectorAll('.item');
		modalItems[i].classList = modalItems[i].classList + ' modal-item';
		modalItems[i].setAttribute('data-index',i);
	}

	//Events
	openGallery = (e)=>{
		const item = e.target;
		if(item.classList.contains('item')){
			const modalGallery = parent.parents(item,'.my-gallery').previousElementSibling;
			const modalElementTarget = modalGallery.querySelectorAll('.modal-item');
			const elementIndex = item.getAttribute('data-index');

			modalGallery.style.display = 'block';

			for(let i = 0; modalElementTarget[i]; i ++){
				modalElementTarget[i].style.display = 'none';
				modalElementTarget[i].classList.remove('active');

				modalElementTarget[i].classList.remove('item');
			}

			modalElementTarget['' + elementIndex + ''].style.display = 'block';
			modalElementTarget['' + elementIndex + ''].classList = modalElementTarget['' + elementIndex + ''].classList + ' active';

		}
	}

	modalNavigation = (e)=>{
		const item = e.target;

		if(item.classList.contains('gal-navigation')){

			const modalParents 	  		= parent.parents(item,'.my-gallery-modal-wrap');
			const modalItems	  		= modalParents.querySelectorAll('.modal-item');
			const totalModalItems 		= modalParents.querySelectorAll('.modal-item').length;
			const modalActiveItemIndex  = modalParents.querySelector('.active').getAttribute('data-index');
			const modalActiveItem 		= modalParents.querySelector('.active');


			if(item.classList.contains('gal-left-button')){
				
				if(modalActiveItemIndex > 0){
	
					let previousIndex = modalActiveItemIndex - 1;
	
					for(let i = 0; modalItems[i]; i ++){
						modalItems[i].style.display = 'none';
						modalItems[i].classList.remove('active');
					}
					
					modalParents.querySelectorAll('[data-index]')[''+ previousIndex +''].style.display = 'block';
					modalParents.querySelectorAll('[data-index]')[''+ previousIndex +''].classList = modalParents.querySelectorAll('[data-index]')[''+ previousIndex +''].classList + ' active';
	
				}
			}

			if(item.classList.contains('gal-right-button')){

				if(modalActiveItemIndex < totalModalItems - 1){

					let nextIndex = modalActiveItemIndex;

					nextIndex ++;
	
					for(let i = 0; modalItems[i]; i ++){
						modalItems[i].style.display = 'none';
						modalItems[i].classList.remove('active');
					}

					modalParents.querySelectorAll('[data-index]')[''+ nextIndex +''].style.display = 'block';
					modalParents.querySelectorAll('[data-index]')[''+ nextIndex +''].classList = modalParents.querySelectorAll('[data-index]')[''+ nextIndex +''].classList + ' active';
	
				}


			}


		}

	}

	closeModal = (e)=>{
		const item = e.target;
		if(item.classList.contains('close-overlay')){
			const mainModal = document.querySelectorAll('.my-gallery-modal-wrap');
			for(let i = 0; mainModal[i]; i++){
				mainModal[i].style.display = 'none';
				mainModal[i].classList.remove('active');
			}
		}
	}

	document.addEventListener('click',openGallery);

	document.addEventListener('click',modalNavigation);

	document.addEventListener('click', closeModal);


}



