const accordions = Array.from(document.querySelectorAll('.accordion'))

export function Accordion() {
    accordions.forEach(acc => {
        acc.addEventListener('click', accHandler)
    })
    
    function accHandler(event) {
        event.preventDefault()
        let currentAcc = event.target.closest('.accordion')
        let currentContent = event.target.nextElementSibling
        currentAcc.classList.toggle('--active')
    
        if (currentAcc.classList.contains('--active')) {
            currentContent.style.maxHeight = currentContent.scrollHeight + 'px'
        } else {
            currentContent.style.maxHeight = 0
        }
    }
}