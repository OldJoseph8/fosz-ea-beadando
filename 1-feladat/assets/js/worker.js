let i = 0;

function count() {
    i++;
    postMessage(i); 
    setTimeout(count, 500);
}
count();