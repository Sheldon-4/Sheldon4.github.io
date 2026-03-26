'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  jeeSyllabus, 
  questions, 
  getFullTestQuestions, 
  getTopicTestQuestions,
  getChapterById,
  getSubjectById,
  type Question,
  type Subject,
  type Chapter
} from '@/lib/jee-data'
import { 
  BookOpen, 
  Clock, 
  Trophy, 
  ArrowLeft, 
  CheckCircle2, 
  XCircle,
  FileText,
  Target,
  Zap,
  Layers,
  Play
} from 'lucide-react'

type View = 'home' | 'syllabus' | 'topic-select' | 'multi-topic-select' | 'quiz' | 'results'

interface UserAnswer {
  questionId: string
  selectedOption: number | null
}

export default function Home() {
  const [view, setView] = useState<View>('home')
  const [testMode, setTestMode] = useState<'full' | 'topic' | 'multi-topic'>('full')
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null)
  const [selectedChapters, setSelectedChapters] = useState<string[]>([])
  const [testQuestions, setTestQuestions] = useState<Question[]>([])
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [testSubmitted, setTestSubmitted] = useState(false)

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning && !testSubmitted) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, testSubmitted])

  // Format time
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Start Full Test
  const startFullTest = () => {
    const fullQuestions = getFullTestQuestions(5)
    setTestQuestions(fullQuestions)
    setUserAnswers(fullQuestions.map(q => ({ questionId: q.id, selectedOption: null })))
    setCurrentQuestionIndex(0)
    setTimeElapsed(0)
    setIsTimerRunning(true)
    setTestSubmitted(false)
    setTestMode('full')
    setView('quiz')
  }

  // Start Topic Test
  const startTopicTest = (chapter: Chapter) => {
    const topicQuestions = getTopicTestQuestions(chapter.id)
    if (topicQuestions.length === 0) {
      alert('No questions available for this topic yet.')
      return
    }
    setTestQuestions(topicQuestions)
    setUserAnswers(topicQuestions.map(q => ({ questionId: q.id, selectedOption: null })))
    setCurrentQuestionIndex(0)
    setTimeElapsed(0)
    setIsTimerRunning(true)
    setTestSubmitted(false)
    setTestMode('topic')
    setSelectedChapter(chapter)
    setView('quiz')
  }

  // Start Multi-Topic Test (90 questions)
  const startMultiTopicTest = () => {
    if (selectedChapters.length === 0) {
      alert('Please select at least one topic.')
      return
    }
    
    // Get questions from all selected chapters
    let allQuestions: Question[] = []
    selectedChapters.forEach(chapterId => {
      const chapterQuestions = questions.filter(q => q.chapterId === chapterId)
      allQuestions = [...allQuestions, ...chapterQuestions]
    })
    
    if (allQuestions.length === 0) {
      alert('No questions available for selected topics.')
      return
    }
    
    // Shuffle and take 90 questions (or all if less than 90)
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5)
    const testQuestions = shuffled.slice(0, Math.min(90, shuffled.length))
    
    setTestQuestions(testQuestions)
    setUserAnswers(testQuestions.map(q => ({ questionId: q.id, selectedOption: null })))
    setCurrentQuestionIndex(0)
    setTimeElapsed(0)
    setIsTimerRunning(true)
    setTestSubmitted(false)
    setTestMode('multi-topic')
    setView('quiz')
  }

  // Toggle chapter selection
  const toggleChapterSelection = (chapterId: string) => {
    setSelectedChapters(prev => 
      prev.includes(chapterId) 
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    )
  }

  // Toggle all chapters in a subject
  const toggleAllChaptersInSubject = (subjectId: string, select: boolean) => {
    const subject = jeeSyllabus.find(s => s.id === subjectId)
    if (!subject) return
    
    const chapterIds = subject.chapters.map(c => c.id)
    
    if (select) {
      setSelectedChapters(prev => [...new Set([...prev, ...chapterIds])])
    } else {
      setSelectedChapters(prev => prev.filter(id => !chapterIds.includes(id)))
    }
  }

  // Select answer
  const selectAnswer = (optionIndex: number) => {
    if (testSubmitted) return
    setUserAnswers(prev => prev.map((ans, idx) => 
      idx === currentQuestionIndex ? { ...ans, selectedOption: optionIndex } : ans
    ))
  }

  // Deselect answer
  const deselectAnswer = () => {
    if (testSubmitted) return
    setUserAnswers(prev => prev.map((ans, idx) => 
      idx === currentQuestionIndex ? { ...ans, selectedOption: null } : ans
    ))
  }

  // Submit test
  const submitTest = () => {
    const unanswered = userAnswers.filter(a => a.selectedOption === null).length
    if (unanswered > 0) {
      if (!confirm(`You have ${unanswered} unanswered questions. Are you sure you want to submit?`)) {
        return
      }
    }
    setIsTimerRunning(false)
    setTestSubmitted(true)
    setView('results')
  }

  // Calculate results
  const calculateResults = () => {
    let correct = 0
    let wrong = 0
    let skipped = 0

    testQuestions.forEach((q, idx) => {
      const userAnswer = userAnswers[idx]
      if (userAnswer.selectedOption === null) {
        skipped++
      } else if (userAnswer.selectedOption === q.correctAnswer) {
        correct++
      } else {
        wrong++
      }
    })

    const score = (correct * 4) - (wrong * 1)
    const maxScore = testQuestions.length * 4
    const percentage = Math.round((score / maxScore) * 100)

    return { correct, wrong, skipped, score, maxScore, percentage }
  }

  // Get available questions count for selected chapters
  const getAvailableQuestionCount = () => {
    let count = 0
    selectedChapters.forEach(chapterId => {
      count += questions.filter(q => q.chapterId === chapterId).length
    })
    return count
  }

  // Render Home View
  const renderHome = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">J</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">JEE Mains Test Portal</h1>
              <p className="text-xs text-slate-500">Practice Makes Perfect</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Welcome to JEE Mains Practice
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Prepare for JEE Mains with our comprehensive test platform. Take full-length tests or focus on specific topics.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
          {/* Full Test Card */}
          <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-orange-500/50" onClick={startFullTest}>
            <CardHeader>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="text-xl">Full Test</CardTitle>
              <CardDescription>Complete JEE Mains simulation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  <span>15 Questions</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Multi-Topic Test Card */}
          <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-blue-500/50" onClick={() => { setSelectedChapters([]); setView('multi-topic-select'); }}>
            <CardHeader>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Layers className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="text-xl">Multi-Topic Test</CardTitle>
              <CardDescription>Select multiple chapters for 90 questions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  <span>90 Questions</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Topic Test Card */}
          <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-green-500/50" onClick={() => setView('topic-select')}>
            <CardHeader>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Target className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="text-xl">Topic-wise Test</CardTitle>
              <CardDescription>Practice specific chapters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  <span>70+ Topics</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Syllabus Card */}
          <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-purple-500/50" onClick={() => setView('syllabus')}>
            <CardHeader>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <CardTitle className="text-xl">View Syllabus</CardTitle>
              <CardDescription>Complete JEE Mains syllabus</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  <span>70 Chapters</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Quick Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {jeeSyllabus.map(subject => (
              <Card key={subject.id} className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl mb-2">{subject.icon}</div>
                  <p className="font-semibold text-slate-900 dark:text-white">{subject.name}</p>
                  <p className="text-sm text-slate-500">{subject.chapters.length} Chapters</p>
                </CardContent>
              </Card>
            ))}
            <Card className="text-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700">
              <CardContent className="pt-6">
                <div className="text-3xl mb-2">📝</div>
                <p className="font-semibold text-slate-900 dark:text-white">Questions</p>
                <p className="text-sm text-slate-500">{questions.length} Available</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )

  // Render Multi-Topic Select View
  const renderMultiTopicSelect = () => {
    const availableQuestions = getAvailableQuestionCount()
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => setView('home')}>
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                  <h1 className="text-xl font-bold text-slate-900 dark:text-white">Select Multiple Topics</h1>
                  <p className="text-xs text-slate-500">Choose chapters for your 90-question test</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {selectedChapters.length} chapters selected
                  </p>
                  <p className="text-xs text-slate-500">
                    {availableQuestions} questions available
                  </p>
                </div>
                <Button 
                  onClick={startMultiTopicTest}
                  disabled={selectedChapters.length === 0}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start 90 Q Test
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-6">
          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="physics" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                {jeeSyllabus.map(subject => {
                  const selectedInSubject = subject.chapters.filter(c => selectedChapters.includes(c.id)).length
                  return (
                    <TabsTrigger key={subject.id} value={subject.id} className="flex items-center gap-2">
                      <span>{subject.icon}</span>
                      <span className="hidden sm:inline">{subject.name}</span>
                      {selectedInSubject > 0 && (
                        <Badge variant="secondary" className="ml-1">
                          {selectedInSubject}
                        </Badge>
                      )}
                    </TabsTrigger>
                  )
                })}
              </TabsList>

              {jeeSyllabus.map(subject => {
                const allSelected = subject.chapters.every(c => selectedChapters.includes(c.id))
                const someSelected = subject.chapters.some(c => selectedChapters.includes(c.id))
                
                return (
                  <TabsContent key={subject.id} value={subject.id}>
                    <Card className="mb-4">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl ${subject.color} flex items-center justify-center`}>
                              <span className="text-xl">{subject.icon}</span>
                            </div>
                            <div>
                              <CardTitle className="text-lg">{subject.name}</CardTitle>
                              <CardDescription>
                                {subject.chapters.filter(c => selectedChapters.includes(c.id)).length} of {subject.chapters.length} selected
                              </CardDescription>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleAllChaptersInSubject(subject.id, !allSelected)}
                          >
                            {allSelected ? 'Deselect All' : 'Select All'}
                          </Button>
                        </div>
                      </CardHeader>
                    </Card>

                    <div className="grid gap-2">
                      {subject.chapters.map((chapter, idx) => {
                        const isSelected = selectedChapters.includes(chapter.id)
                        const questionCount = questions.filter(q => q.chapterId === chapter.id).length
                        
                        return (
                          <Card 
                            key={chapter.id} 
                            className={`cursor-pointer transition-all ${isSelected ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30' : 'hover:border-slate-300'}`}
                            onClick={() => toggleChapterSelection(chapter.id)}
                          >
                            <CardContent className="p-3">
                              <div className="flex items-center gap-3">
                                <Checkbox 
                                  checked={isSelected}
                                  onCheckedChange={() => toggleChapterSelection(chapter.id)}
                                  className="data-[state=checked]:bg-blue-500"
                                />
                                <Badge variant="outline" className="w-7 h-7 rounded-full flex items-center justify-center text-xs">
                                  {idx + 1}
                                </Badge>
                                <div className="flex-1">
                                  <p className={`font-medium text-sm ${isSelected ? 'text-blue-700 dark:text-blue-300' : 'text-slate-900 dark:text-white'}`}>
                                    {chapter.name}
                                  </p>
                                  <p className="text-xs text-slate-500">
                                    {chapter.topics.length} topics • {questionCount} questions
                                  </p>
                                </div>
                                {isSelected && (
                                  <CheckCircle2 className="w-5 h-5 text-blue-500" />
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  </TabsContent>
                )
              })}
            </Tabs>
          </div>
        </main>
      </div>
    )
  }

  // Render Syllabus View
  const renderSyllabus = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setView('home')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">JEE Mains Syllabus</h1>
              <p className="text-xs text-slate-500">Complete chapter-wise syllabus</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="physics" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            {jeeSyllabus.map(subject => (
              <TabsTrigger key={subject.id} value={subject.id} className="flex items-center gap-2">
                <span>{subject.icon}</span>
                <span className="hidden sm:inline">{subject.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {jeeSyllabus.map(subject => (
            <TabsContent key={subject.id} value={subject.id}>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl ${subject.color} flex items-center justify-center`}>
                      <span className="text-2xl">{subject.icon}</span>
                    </div>
                    <div>
                      <CardTitle>{subject.name}</CardTitle>
                      <CardDescription>{subject.chapters.length} Chapters • Complete JEE Mains Syllabus</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {subject.chapters.map((chapter, idx) => (
                      <AccordionItem key={chapter.id} value={chapter.id}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center gap-3 text-left">
                            <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center">
                              {idx + 1}
                            </Badge>
                            <span>{chapter.name}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pl-11">
                            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Topics Covered:</h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {chapter.topics.map((topic, tidx) => (
                                <li key={tidx} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>{topic}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  )

  // Render Topic Select View
  const renderTopicSelect = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setView('home')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">Select Topic</h1>
              <p className="text-xs text-slate-500">Choose a chapter to practice</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="physics" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            {jeeSyllabus.map(subject => (
              <TabsTrigger key={subject.id} value={subject.id} className="flex items-center gap-2">
                <span>{subject.icon}</span>
                <span className="hidden sm:inline">{subject.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {jeeSyllabus.map(subject => (
            <TabsContent key={subject.id} value={subject.id}>
              <div className="grid gap-3">
                {subject.chapters.map((chapter, idx) => {
                  const questionCount = questions.filter(q => q.chapterId === chapter.id).length
                  return (
                    <Card 
                      key={chapter.id} 
                      className="hover:shadow-lg transition-all cursor-pointer group"
                      onClick={() => startTopicTest(chapter)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="w-8 h-8 rounded-full flex items-center justify-center">
                              {idx + 1}
                            </Badge>
                            <div>
                              <p className="font-medium text-slate-900 dark:text-white group-hover:text-orange-500 transition-colors">
                                {chapter.name}
                              </p>
                              <p className="text-xs text-slate-500">{chapter.topics.length} topics • {questionCount} questions</p>
                            </div>
                          </div>
                          <Button size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            Start Test
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  )

  // Render Quiz View
  const renderQuiz = () => {
    const currentQuestion = testQuestions[currentQuestionIndex]
    const currentAnswer = userAnswers[currentQuestionIndex]
    const answeredCount = userAnswers.filter(a => a.selectedOption !== null).length

    const getTestTitle = () => {
      if (testMode === 'full') return 'Full Test'
      if (testMode === 'multi-topic') return `Multi-Topic Test (${testQuestions.length} Questions)`
      return `Topic: ${selectedChapter?.name}`
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => {
                    if (confirm('Are you sure you want to exit? Your progress will be lost.')) {
                      setView('home')
                      setIsTimerRunning(false)
                    }
                  }}
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {getTestTitle()}
                  </p>
                  <p className="text-xs text-slate-500">
                    {answeredCount} of {testQuestions.length} answered
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">
                  <Clock className="w-4 h-4 text-slate-500" />
                  <span className="font-mono text-sm font-medium">{formatTime(timeElapsed)}</span>
                </div>
                <Button onClick={submitTest} className="bg-green-600 hover:bg-green-700">
                  Submit Test
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-6">
              <Progress value={(answeredCount / testQuestions.length) * 100} className="h-2" />
            </div>

            {/* Question Card */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="text-sm">
                      Question {currentQuestionIndex + 1}/{testQuestions.length}
                    </Badge>
                    <Badge 
                      variant={currentQuestion.difficulty === 'easy' ? 'default' : 
                               currentQuestion.difficulty === 'medium' ? 'secondary' : 'destructive'}
                    >
                      {currentQuestion.difficulty}
                    </Badge>
                  </div>
                  {getSubjectById(currentQuestion.subjectId) && (
                    <Badge variant="outline" className="gap-1">
                      <span>{getSubjectById(currentQuestion.subjectId)?.icon}</span>
                      <span>{getSubjectById(currentQuestion.subjectId)?.name}</span>
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium text-slate-900 dark:text-white mb-6">
                  {currentQuestion.question}
                </p>

                <div className="space-y-3">
                  {currentQuestion.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => selectAnswer(idx)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        currentAnswer.selectedOption === idx
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/30'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          currentAnswer.selectedOption === idx
                            ? 'bg-orange-500 text-white'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </div>
                        <span className={`${
                          currentAnswer.selectedOption === idx
                            ? 'text-orange-700 dark:text-orange-300 font-medium'
                            : 'text-slate-700 dark:text-slate-300'
                        }`}>
                          {option}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={deselectAnswer}
                  disabled={currentAnswer.selectedOption === null}
                >
                  Deselect Answer
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </Button>
                <Button
                  onClick={() => setCurrentQuestionIndex(Math.min(testQuestions.length - 1, currentQuestionIndex + 1))}
                  disabled={currentQuestionIndex === testQuestions.length - 1}
                >
                  Next
                </Button>
              </div>
            </div>

            {/* Question Navigator */}
            <Card className="mt-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Question Navigator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {testQuestions.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={`w-10 h-10 rounded-lg font-medium text-sm transition-all ${
                        idx === currentQuestionIndex
                          ? 'bg-orange-500 text-white'
                          : userAnswers[idx].selectedOption !== null
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-500'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  // Render Results View
  const renderResults = () => {
    const results = calculateResults()

    const getRetakeAction = () => {
      if (testMode === 'full') {
        return startFullTest
      } else if (testMode === 'multi-topic') {
        return () => {
          setSelectedChapters([])
          setView('multi-topic-select')
        }
      } else if (selectedChapter) {
        return () => startTopicTest(selectedChapter)
      }
      return () => setView('home')
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => setView('home')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">Test Results</h1>
                <p className="text-xs text-slate-500">Time taken: {formatTime(timeElapsed)}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Score Card */}
            <Card className="mb-6 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-80 mb-1">Your Score</p>
                    <p className="text-4xl font-bold">{results.score}/{results.maxScore}</p>
                  </div>
                  <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                    <Trophy className="w-10 h-10" />
                  </div>
                </div>
                <div className="mt-4">
                  <Progress value={results.percentage} className="h-3 bg-white/20" />
                  <p className="text-sm mt-2 opacity-80">{results.percentage}% Score</p>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20">
                    <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">{results.correct}</p>
                    <p className="text-sm text-slate-500">Correct (+4 each)</p>
                  </div>
                  <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20">
                    <XCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">{results.wrong}</p>
                    <p className="text-sm text-slate-500">Wrong (-1 each)</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800">
                    <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-600 mx-auto mb-2 flex items-center justify-center">
                      <span className="text-slate-600 dark:text-slate-300">?</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-600 dark:text-slate-300">{results.skipped}</p>
                    <p className="text-sm text-slate-500">Skipped</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-6">
              <Button onClick={() => setView('home')} className="flex-1">
                Back to Home
              </Button>
              <Button 
                variant="outline" 
                onClick={getRetakeAction()}
                className="flex-1"
              >
                Retake Test
              </Button>
            </div>

            {/* Detailed Review */}
            <Card>
              <CardHeader>
                <CardTitle>Detailed Review</CardTitle>
                <CardDescription>Review all questions and answers</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-6">
                    {testQuestions.map((q, idx) => {
                      const userAnswer = userAnswers[idx]
                      const isCorrect = userAnswer.selectedOption === q.correctAnswer
                      const isSkipped = userAnswer.selectedOption === null
                      const subject = getSubjectById(q.subjectId)

                      return (
                        <div key={q.id} className={`p-4 rounded-xl border ${
                          isSkipped 
                            ? 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50'
                            : isCorrect 
                            ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
                            : 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20'
                        }`}>
                          <div className="flex items-start gap-3 mb-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              isSkipped 
                                ? 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                                : isCorrect 
                                ? 'bg-green-500 text-white'
                                : 'bg-red-500 text-white'
                            }`}>
                              {isSkipped ? '?' : isCorrect ? '✓' : '✗'}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline">Q{idx + 1}</Badge>
                                {subject && (
                                  <Badge variant="secondary" className="gap-1">
                                    <span>{subject.icon}</span>
                                    <span>{subject.name}</span>
                                  </Badge>
                                )}
                              </div>
                              <p className="font-medium text-slate-900 dark:text-white mb-3">{q.question}</p>
                              
                              <div className="space-y-2">
                                {q.options.map((opt, optIdx) => (
                                  <div 
                                    key={optIdx}
                                    className={`p-2 rounded-lg text-sm ${
                                      optIdx === q.correctAnswer
                                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-300'
                                        : optIdx === userAnswer.selectedOption && !isCorrect
                                        ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-300'
                                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                                    }`}
                                  >
                                    <span className="font-medium mr-2">{String.fromCharCode(65 + optIdx)}.</span>
                                    {opt}
                                    {optIdx === q.correctAnswer && ' ✓'}
                                    {optIdx === userAnswer.selectedOption && optIdx !== q.correctAnswer && ' (Your answer)'}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  // Main render
  return (
    <>
      {view === 'home' && renderHome()}
      {view === 'syllabus' && renderSyllabus()}
      {view === 'topic-select' && renderTopicSelect()}
      {view === 'multi-topic-select' && renderMultiTopicSelect()}
      {view === 'quiz' && renderQuiz()}
      {view === 'results' && renderResults()}
    </>
  )
}
