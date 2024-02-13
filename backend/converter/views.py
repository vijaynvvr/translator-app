from flask import Blueprint, request, jsonify
from pdfminer.high_level import extract_text
import os
from googletrans import Translator

views = Blueprint('views', __name__)

def extract_text_from_pdf(pdf_file_path):
    try:
        text = extract_text(pdf_file_path)
        return text
    except Exception as e:
        return str(e)

@views.route("/extractText", methods=['POST'])
def extract():
    if request.method == 'POST':
        file_name = request.files.get('file')
        file_path = os.path.join(os.getcwd(), 'converter', 'downloads', file_name.filename)
        file_name.save(file_path)
        extracted_text = extract_text_from_pdf(file_path)
        input_language = request.form.get('input_language')
        translated_text = translate_text(extracted_text, input_language)
        return jsonify({"translated_text": translated_text})

def translate_text(text, input_language):
    translator = Translator()
    translation = translator.translate(text, src='en', dest=input_language)
    return translation.text
