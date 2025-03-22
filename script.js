// function formatDoc(cmd, value=null) {
// 	if(value) {
// 		document.execCommand(cmd, false, value);
// 	} else {
// 		document.execCommand(cmd);
// 	}
// }

// function addLink() {
// 	const url = prompt('Insert url');
// 	formatDoc('createLink', url);
// }
// دالة تنسيق النصوص بناءً على الأمر
const content = document.getElementById('content');

const formatDoc = (cmd, value = null) => {
    if (value) {
        document.execCommand(cmd, false, value);
    } else {
        document.execCommand(cmd, false, null);
    }
};

document.body.addEventListener('keydown', (event) =>{
    if (event.ctrlKey) {
        switch (event.key.toLowerCase()) {
            case 'b':
                event.preventDefault();
                formatDoc('bold');
                break;
            case 'i': 
                event.preventDefault();
                formatDoc('italic');
                break;
            case 'u':
                event.preventDefault();
                formatDoc('underline');
                break;
            case 's': 
                event.preventDefault();
                formatDoc('strikethrough');
                break;
            default:
                break;
        }
    }
    })
document.querySelectorAll('.btn-toolbar button').forEach(button => {
    
    const cmd = button.getAttribute('data-cmd');
    
    
    if (cmd) {
        
        button.addEventListener('click', () => {
            formatDoc(cmd);
            
        });
    } else if (button.id === 'addLink') {
        
        button.addEventListener('click', () => {
            const url = prompt('Insert URL');
            formatDoc('createLink', url);
        });
    }
    
});

// for color 
const textColorInput = document.getElementById('textColor');
const bgColorInput = document.getElementById('bgColor');

textColorInput.addEventListener('input', (event) => {
    formatDoc('foreColor', event.target.value);
    // event.target.value = '#000000';  
});

bgColorInput.addEventListener('input', (event) => {
    formatDoc('hiliteColor', event.target.value);
    // event.target.value = '#000000';  
});

//for font size
const fontSizeSelect = document.getElementById('fontSizeSelect');

fontSizeSelect.addEventListener('change', (event) => {
    const fontSize = event.target.value;
    if (fontSize) {
        formatDoc('fontSize', fontSize);
        fontSizeSelect.selectedIndex = 0;
    }
});

//for format text
const formatSelect = document.getElementById('formatSelect');

formatSelect.addEventListener('change', (event) => {
    const formatValue = event.target.value;
    if (formatValue) {
        formatDoc('formatBlock', formatValue);
        formatSelect.selectedIndex = 0;
    }
});



content.addEventListener('mouseenter', function () {
	const a = content.querySelectorAll('a');
	a.forEach(item=> {
		item.addEventListener('mouseenter', function () {
			content.setAttribute('contenteditable', false);
			item.target = '_blank';
		})
		item.addEventListener('mouseleave', function () {
			content.setAttribute('contenteditable', true);
		})
	})
})

//show code
// const showCode = document.getElementById('show-code');
// let active = false;

// showCode.addEventListener('click', function () {
// 	showCode.dataset.active = !active;
// 	active = !active
// 	if(active) {
// 		content.textContent = content.innerHTML;
// 		content.setAttribute('contenteditable', false);
// 	} else {
// 		content.innerHTML = content.textContent;
// 		content.setAttribute('contenteditable', true);
// 	}
// })

const filename = document.getElementById('filename');


// const filename = document.getElementById('filename');
const fileOptions = document.getElementById('fileOptions');

fileOptions.addEventListener('change', (event) => {
    const value = event.target.value;

    if (value === 'new') {
        content.innerHTML = '';
        filename.value = 'untitled';
    } else if (value === 'txt') {
        const blob = new Blob([content.innerText]);
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${filename.value}.txt`;
        link.click();
    } else if (value === 'pdf') {
        html2pdf().from(content).save(filename.value);
    }

    fileOptions.selectedIndex = 0;
});
document.addEventListener('DOMContentLoaded', (event) => {
    const contentDiv = document.getElementById('content');
    if (contentDiv) {
        contentDiv.focus();
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(contentDiv);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
    }
});

const sound = document.querySelector('#sound');

document.addEventListener('keydown', (event) => {
    sound.currentTime = 0;
    sound.play();
});