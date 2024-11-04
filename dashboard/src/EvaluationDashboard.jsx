import React, { useState } from 'react';
import { Plus, Trash2, Save, Download, Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '.components/card.jsx';

const EvaluationDashboard = () => {
  const [testCases, setTestCases] = useState([
    { 
      id: 1,
      input: '',
      expectedOutput: '',
      actualOutput: '',
      metrics: {
        relevance: 0,
        coherence: 0,
        groundedness: 0,
        context_recall: 0
      }
    }
  ]);

  const [selectedTestCase, setSelectedTestCase] = useState(null);
  const [evaluationResults, setEvaluationResults] = useState(null);

  const addTestCase = () => {
    const newId = testCases.length + 1;
    setTestCases([...testCases, {
      id: newId,
      input: '',
      expectedOutput: '',
      actualOutput: '',
      metrics: {
        relevance: 0,
        coherence: 0,
        groundedness: 0,
        context_recall: 0
      }
    }]);
  };

  const removeTestCase = (id) => {
    setTestCases(testCases.filter(tc => tc.id !== id));
  };

  const updateTestCase = (id, field, value) => {
    setTestCases(testCases.map(tc => 
      tc.id === id ? { ...tc, [field]: value } : tc
    ));
  };

  const exportTestCases = () => {
    const dataStr = JSON.stringify(testCases, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'rag-evaluation-testcases.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">RAG Chatbot Evaluation Dashboard</h1>
          <div className="space-x-2">
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2 hover:bg-blue-700"
              onClick={exportTestCases}
            >
              <Download size={16} /> Export
            </button>
            <button 
              className="px-4 py-2 bg-green-600 text-white rounded-md flex items-center gap-2 hover:bg-green-700"
              onClick={addTestCase}
            >
              <Plus size={16} /> Add Test Case
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {testCases.map((testCase) => (
            <Card key={testCase.id} className="shadow-md">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Test Case #{testCase.id}</CardTitle>
                <button 
                  className="text-red-500 hover:text-red-700"
                  onClick={() => removeTestCase(testCase.id)}
                >
                  <Trash2 size={16} />
                </button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Input Query</label>
                    <textarea
                      className="w-full p-2 border rounded-md h-24"
                      value={testCase.input}
                      onChange={(e) => updateTestCase(testCase.id, 'input', e.target.value)}
                      placeholder="Enter your test query..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Expected Output</label>
                    <textarea
                      className="w-full p-2 border rounded-md h-24"
                      value={testCase.expectedOutput}
                      onChange={(e) => updateTestCase(testCase.id, 'expectedOutput', e.target.value)}
                      placeholder="Enter expected response..."
                    />
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium mb-2">Evaluation Metrics</h4>
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600">Relevance</label>
                      <div className="text-lg font-medium">{testCase.metrics.relevance.toFixed(2)}</div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">Coherence</label>
                      <div className="text-lg font-medium">{testCase.metrics.coherence.toFixed(2)}</div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">Groundedness</label>
                      <div className="text-lg font-medium">{testCase.metrics.groundedness.toFixed(2)}</div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">Context Recall</label>
                      <div className="text-lg font-medium">{testCase.metrics.context_recall.toFixed(2)}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Actual Output</label>
                  <textarea
                    className="w-full p-2 border rounded-md h-24 bg-gray-50"
                    value={testCase.actualOutput}
                    readOnly
                    placeholder="Actual response will appear here after evaluation..."
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {evaluationResults && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Overall Evaluation Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm text-gray-600">Average Relevance</label>
                  <div className="text-xl font-medium">{evaluationResults.avgRelevance.toFixed(2)}</div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Average Coherence</label>
                  <div className="text-xl font-medium">{evaluationResults.avgCoherence.toFixed(2)}</div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Average Groundedness</label>
                  <div className="text-xl font-medium">{evaluationResults.avgGroundedness.toFixed(2)}</div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Average Context Recall</label>
                  <div className="text-xl font-medium">{evaluationResults.avgContextRecall.toFixed(2)}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EvaluationDashboard;