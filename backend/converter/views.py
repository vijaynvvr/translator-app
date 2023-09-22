from flask import Blueprint
from pdfminer.high_level import extract_text
from flask import request
import os
views =Blueprint('views',__name__)


def extract_text_from_pdf(pdf_file_path):
    try:
        text = extract_text(pdf_file_path)
        return text
    except Exception as e:
        return str(e)
# pdf_file_path = "/content/5_6170415528016873447.pdf"  # Replace with the path to your PDF file

# extracted_text = extract_text_from_pdf(pdf_file_path)
@views.post("/extractText")
def extract():
    print("extract")
    if request.method=='POST':
        
        file_name=request.files.get('file')
        print(file_name.filename)
        print(os.path.join(os.getcwd()+'/converter/downloads/'+file_name.filename))
        file_name.save(os.path.join(os.getcwd()+'/converter/downloads/'+file_name.filename))
        response=extract_text_from_pdf(os.path.join(os.getcwd()+'/converter/downloads/'+file_name.filename))
        # response=None
        return response


