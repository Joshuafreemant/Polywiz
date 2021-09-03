const pdf_name=document.getElementById('save_as');
var pdf = new PDFAnnotate("pdf-container", "../pp.pdf", {
  onPageUpdated(page, oldData, newData) {
    console.log(page, oldData, newData);
  },
  ready() {
    console.log("Plugin initialized successfully");

  },
  scale: 1.5,
  pageImageCompression: "SLOW", // FAST, MEDIUM, SLOW(Helps to control the new PDF file size)
});

function changeActiveTool(event) {
    var element = $(event.target).hasClass("tool-button")
      ? $(event.target)
      : $(event.target).parents(".tool-button").first();
    $(".tool-button.active").removeClass("active");
    $(element).addClass("active");
}

function enableSelector(event) {
    event.preventDefault();
    changeActiveTool(event);
    pdf.enableSelector();
}

function enablePencil(event) {
    event.preventDefault();
    changeActiveTool(event);
    pdf.enablePencil();
}

function enableAddText(event) {
    event.preventDefault();
    changeActiveTool(event);
    pdf.setColor('rgb(0, 0, 0)');
    pdf.enableAddText();
}



function addImage(event) {
    event.preventDefault();
    pdf.addImageToCanvas()
}
function addTextCanvas(event) {
    event.preventDefault();
    pdf.addTextToCanvas()
}



function enableRectangle(event) {
    event.preventDefault();
    changeActiveTool(event);
    pdf.setColor('rgba(255, 255, 255,0.1)');
    pdf.setBorderColor('#000');
   
    pdf.enableRectangle();
}
// new
function enableLine(event) {
    event.preventDefault();
    changeActiveTool(event);
    pdf.setColor('rgb(255, 255, 255)');
    pdf.setBorderColor('#000');
   
    pdf.enableLine();
}
// new

function deleteSelectedObject(event) {
  event.preventDefault();
  pdf.deleteSelectedObject();
}

function savePDF() {
    // pdf.savePdf();
    pdf.savePdf(pdf_name.value); // save with given file name
    console.log(pdf)
    
    }

function clearPage() {
    pdf.clearActivePage();
}

function showPdfData() {
    var string = pdf.serializePdf();
    $('#dataModal .modal-body pre').first().text(string);
    PR.prettyPrint();
    $('#dataModal').modal('show');
}

$(function () {
    $('.color-tool').click(function () {
        $('.color-tool.active').removeClass('active');
        $(this).addClass('active');
        color = $(this).get(0).style.backgroundColor;
        pdf.setColor(color);
    });

    $('#brush-size').change(function () {
        var width = $(this).val();
        pdf.setBrushSize(width);
    });

    $('#font-size').change(function () {
        var font_size = $(this).val();
        pdf.setFontSize(font_size);
    });
});
