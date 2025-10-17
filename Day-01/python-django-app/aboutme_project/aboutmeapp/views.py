from django.shortcuts import render

def home(request):
    context = {
        'name': 'Dhanunjaya',
        'title': 'DevOps Engineer | Tech Enthusiast',
        'bio': 'I am a passionate DevOps Engineer who loves building CI CD and fixing real world problems using Docker, Kubernetes, and other modern technologies.',
        'skills': ['AWS', 'Azure', 'Docker', 'Kubernetes'],
        'hobbies': ['Reading', 'Music', 'Coding Projects']
    }
    return render(request, 'aboutmeapp/home.html', context)
