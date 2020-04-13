
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
			<div class="navigation-bullets">
			</div>
		</div>
		<button class="close-overlay"></button>
	
	`;

	myGallery.parentElement.insertBefore(myGalleryModal,myGallery);

	for(let i = 0; myGalleryItem[i]; i ++){
		const initImg = myGalleryItem[i];
		const clonedImg = initImg.cloneNode(true); //Cloning element and behaviours
		const putImgOnTarget = parent.parents(initImg,'.my-gallery').previousElementSibling.querySelector('.my-gallery-modal-img-group');
		putImgOnTarget.appendChild(clonedImg);
		
		initImg.setAttribute('data-index',i);

		const modalItems = putImgOnTarget.querySelectorAll('.item');
		modalItems[i].classList = modalItems[i].classList + ' modal-item';
		modalItems[i].setAttribute('data-index',i);

		//Make bullets
		const bulletTarget = document.querySelector('.navigation-bullets');
		const newBullet = document.createElement('div');
		newBullet.className = 'bullet';
		//newBullet.innerHTML = `<button type="button"></button>`;

		bulletTarget.appendChild(newBullet);

	}

	//Events
	openGallery = (e)=>{
		const item = e.target;
		if(item.classList.contains('item')){
			const modalGallery = parent.parents(item,'.my-gallery').previousElementSibling;
			const modalElementTarget = modalGallery.querySelectorAll('.modal-item');
			const elementIndex = item.getAttribute('data-index');

			const bulletTarget = modalGallery.querySelectorAll('.bullet');

			modalGallery.style.display = 'block';

			for(let i = 0; modalElementTarget[i]; i ++){
				modalElementTarget[i].style.display = 'none';
				modalElementTarget[i].classList.remove('active');

				modalElementTarget[i].classList.remove('item');
			}

			modalElementTarget['' + elementIndex + ''].style.display = 'block';
			modalElementTarget['' + elementIndex + ''].classList = modalElementTarget['' + elementIndex + ''].classList + ' active';

			//Activate bullet
			const allBullets = modalGallery.querySelectorAll('.bullet');

			for(let i = 0; allBullets[i]; i++){
				allBullets[i].setAttribute('bullet-index',i);
				allBullets[i].classList.remove('active');
			}
			bulletTarget['' + elementIndex + ''].classList = bulletTarget['' + elementIndex + ''].classList + ' active';

		}
	}

	modalNavigation = (e)=>{
		const item = e.target;

		if(item.classList.contains('gal-navigation')){

			const modalParents 	  		= parent.parents(item,'.my-gallery-modal-wrap');
			const modalItems	  		= modalParents.querySelectorAll('.modal-item');
			const totalModalItems 		= modalParents.querySelectorAll('.modal-item').length;
			const modalActiveItemIndex  = modalParents.querySelector('.active').getAttribute('data-index');
			//const modalActiveItem 		= modalParents.querySelector('.active');

			const modalBullets 			= modalParents.querySelectorAll('.bullet');

			if(item.classList.contains('gal-left-button')){
				
				if(modalActiveItemIndex > 0){
	
					let previousIndex = modalActiveItemIndex - 1;
	
					for(let i = 0; modalItems[i]; i ++){
						modalItems[i].style.display = 'none';
						modalItems[i].classList.remove('active');

						modalBullets[i].classList.remove('active');
					}
					
					modalParents.querySelectorAll('[data-index]')[''+ previousIndex +''].style.display = 'block';
					modalParents.querySelectorAll('[data-index]')[''+ previousIndex +''].classList = modalParents.querySelectorAll('[data-index]')[''+ previousIndex +''].classList + ' active';
	
					modalBullets[''+ previousIndex +''].classList = modalBullets[''+ previousIndex +''].classList + ' active';

				}
			}

			if(item.classList.contains('gal-right-button')){

				if(modalActiveItemIndex < totalModalItems - 1){

					let nextIndex = modalActiveItemIndex;

					nextIndex ++;
	
					for(let i = 0; modalItems[i]; i ++){
						modalItems[i].style.display = 'none';
						modalItems[i].classList.remove('active');

						modalBullets[i].classList.remove('active');
					}

					modalParents.querySelectorAll('[data-index]')[''+ nextIndex +''].style.display = 'block';
					modalParents.querySelectorAll('[data-index]')[''+ nextIndex +''].classList = modalParents.querySelectorAll('[data-index]')[''+ nextIndex +''].classList + ' active';
	
					modalBullets[''+ nextIndex +''].classList = modalBullets[''+ nextIndex +''].classList + ' active';

				}

			}

		}

		//Bullet navigation
		if(item.classList.contains('bullet')){
			const modalParents 	  		= parent.parents(item,'.my-gallery-modal-wrap');
			const allBullets = item.parentElement.querySelectorAll('.bullet');
			const bulletIndex = item.getAttribute('bullet-index');
			const modalGalleryItems = modalParents.querySelectorAll('.modal-item');

			for(let i = 0; allBullets[i]; i++){
				allBullets[i].classList.remove('active');
				modalGalleryItems[i].classList.remove('active');
				modalGalleryItems[i].style.display = 'none';
			}

			item.classList = item.classList + ' active';
			modalGalleryItems[''+ bulletIndex +''].style.display = 'block';
			modalGalleryItems[''+ bulletIndex +''].classList = modalGalleryItems[''+ +''].classList + ' active';

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
